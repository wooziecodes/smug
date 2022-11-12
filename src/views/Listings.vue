<template>
  <Navbar @search="search" @searchedMods="loadSearchedMods"></Navbar>
  <!-- <Navbar></Navbar> -->
  <div class="input-container mt-5">
          <input class="searchBar form-control" style="width: 393px;" @focusin="searching = true" @focusout="searching = false" @keydown.enter="search"
            placeholder="Search for modules here" id="searchBar" type="text" v-model="searchStr" />

          <ul class="dropdown" id="dropdown" v-if="searching" style="position:absolute">
            <li class="dropdown-item shadow" v-for="mod of modulesDropdown">{{ mod }}</li>
          </ul>
  </div>

  <div class="search-results container">
    <span class="results" v-if="searched">search results for "{{ searchStr }}"</span>
    <div class="filter-container d-flex align-items-center">
      <div class="sort-container d-flex justify-content-between">
        <button type="button" class="btn btn-light" :class="{ active: isAll }" @click="getListings(uid)">All
          listings</button>
        <div class="vertical-rule"></div>
        <button type="button" class="btn btn-light" :class="{ active: isBookmark }"
          @click="filterBookmark">Bookmarked</button>
        <!-- <button type="button" class="btn btn-light">Reviews</button>
        <button type="button" class="btn btn-light">
          <span>Price: High to Low</span>
          <font-awesome-icon icon="fa-solid fa-chevron-down" />
        </button>
        <button type="button" class="btn btn-light">
          <span> Price: Low to High</span>
          <font-awesome-icon icon="fa-solid fa-chevron-up" />
        </button> -->
      </div>
      <!-- <button type="button" class="btn btn-light">
        <span>More Filters</span>
        <font-awesome-icon icon="fa-solid fa-filter" />
      </button> -->
    </div>
  </div>
  <div class="listings-container container d-flex flex-wrap">
    <ListingComponent v-for="listing in listings" @listingId="openChat" @bookmarked="addBookmark"
      @unbookmarked="removeBookmark" class="listing-component" :id="listing.id" :tutor="listing.user"
      :code="listing.module" :prof="listing.prof" :price="listing.price" :uid="listing.userID">
    </ListingComponent>
  </div>
  <div class="wave">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path
        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
        class="shape-fill"></path>
    </svg>
  </div>
</template>
<script>
import ListingComponent from "../components/ListingComponent.vue";
import { getDocs, query, collection, where, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import { db, auth } from "../firebase/init";
import Navbar from "../components/Navbar.vue";

export default {
  data() {
    return {
      listings: [],
      uid: "",
      isAll: true,
      isBookmark: false,
      searchStr: "",
      searched: false,
      searchMods: [],
      searching: true,
      modulesDropdown: [1,2,3,4],
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid
        this.getListings(user.uid);
      } else {
        console.log("Not signed in")
      }
    })
  },
  methods: {
    async getListings(uid) {
      this.isAll = true
      this.isBookmark = false
      this.listings = []
      this.searched = false
      if (this.$route.params.query == "" || Object.keys(this.$route.params).length == 0) {
        const querySnap = await getDocs(query(collection(db, "listings"), where("userID", "!=", uid)));
        querySnap.forEach((doc) => {
          let listing = doc.data()
          listing["id"] = doc.id
          this.listings.push(listing);
        });
      } else {
        this.searched = true
        this.searchStr = this.$route.params.query
        const q = query(collection(db, "module"))
        const querySnapshot = await getDocs(q)
        var modules = []
        querySnapshot.forEach((doc) => {
          var modName = doc.data().name
          var modCode = doc.data().code
          var modStr = modCode + ": " + modName
          modules.push(modStr)
        })
        var searched = []
        for (var mod of modules) {
          if (mod.toLowerCase().includes(this.$route.params.query.toLowerCase())) {
            searched.push(mod)
          }
        }
        this.displaySearch(searched)
      }
    },
    async addBookmark(e) {
      const querySnap = await getDocs(query(collection(db, "users"), where("uid", "==", this.uid)));
      querySnap.forEach((d) => {
        var bookmarks = d.data().bookmarked
        bookmarks.push(e)
        const userRef = doc(db, "users", d.id)
        updateDoc(userRef, {
          bookmarked: bookmarks
        })
      });
    },
    async removeBookmark(e) {
      const querySnap = await getDocs(query(collection(db, "users"), where("uid", "==", this.uid)));
      querySnap.forEach((d) => {
        var bookmarks = d.data().bookmarked
        var idx = bookmarks.indexOf(e)
        bookmarks.splice(idx, 1)
        const userRef = doc(db, "users", d.id)
        updateDoc(userRef, {
          bookmarked: bookmarks
        }).then((res) => {
          this.filterBookmark()
        })
      });
    },
    async filterBookmark() {
      this.searched = false
      this.isAll = false
      this.isBookmark = true
      this.listings = []
      const querySnap = await getDocs(query(collection(db, "users"), where("uid", "==", this.uid)));
      querySnap.forEach((doc) => {
        var bookmarked = doc.data().bookmarked
        getDocs(query(collection(db, "listings")))
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (bookmarked.includes(doc.id)) {
                let listing = doc.data()
                listing["id"] = doc.id
                this.listings.push(listing);
              }
            })
          })

      });
    },
    openChat(e) {
      this.$router.push({ name: 'Chat', params: { id: e } })
    },
    search(e) {
      this.searchStr = e
      this.searched = true
    },
    loadSearchedMods(e) {
      this.displaySearch(e)
    },
    displaySearch(e) {
      this.listings = []
      for (var mod of e) {
        getDocs(query(collection(db, "listings"), where("module", "==", mod.split(": ")[0])))
          .then((querySnap) => {
            querySnap.forEach((doc) => {
              let listing = doc.data()
              listing["id"] = doc.id
              this.listings.push(listing);
            })
          })
      }
    }
  },
  components: { ListingComponent, Navbar },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.search-results {
  padding-top: 5vh;
}

.results {
  font-size: 1vw;
}

.filter-container {
  margin-top: 2%;
  height: 5vh;
}

.sort-container {
  width: 25%;
}

.btn {
  background-color: #f3f9fb !important;
}

.btn span {
  margin-right: 0.5vw;
}

.active {
  background-color: #75acb4 !important;
  color: white !important;
}

.vertical-rule {
  width: 1vw;
  margin-right: 1vw;
  height: 6vh;
  border-right: 1px solid #c5c5c6;
}

.listings-container {
  margin-top: 3%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding-top: 1%;
  margin-bottom: 5%;
  z-index: 1;
  background-color: #ffffff;
}

.listing-component {
  flex-basis: 20%;
  margin-bottom: 2%;
  margin-left: 3%;
}

.wave {
  position: fixed;
  z-index: -9;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.wave svg {
  position: relative;
  display: block;
  width: calc(192% + 1.3px);
  height: 500px;
}

.wave .shape-fill {
  fill: #F3F9FB;
}



@media only screen and (min-width: 1550px) {
  .listing-component {
    flex-basis: 20%;
    margin-left: 3%;
  }
  .container {
    /* max-width: 1700px !important; */
    max-width: 1400px !important;
  }
}
@media only screen and (max-width: 1200px) {
  .listing-component {
    flex-basis: 18%;
    margin-left: 4.5%;
  }
}

@media only screen and (max-width: 991px) {
  .listing-component {
    flex-basis: 27%;
    margin-left: 3.2%;
  }
}

@media only screen and (max-width: 767px) {
  .listing-component {
    flex-basis: 27%;
    margin-left: 2.2%;
  }
}

@media only screen and (max-width: 538px) {
  .listing-component {
    flex-basis: 26%;
    margin-left: 3%;
  }
}

@media only screen and (max-width: 513px) {
  .listing-component {
    flex-basis: 40%;
    margin-left: 5%;
  }
}

@media only screen and (max-width: 429px) {
  .listing-component {
    flex-basis: 40%;
    margin-left: 4.5%;
  }
}

@media only screen and (max-width: 393px) {
  .listing-component {
    flex-basis: 40%;
    margin-left: 4%;
  }
}

@media only screen and (max-width: 363px) {
  .listing-component {
    flex-basis: 40%;
    margin-left: 3.5%;
  }
}

@media only screen and (max-width: 337px) {
  .listing-component {
    flex-basis: 80%;
    margin-left: 10%;
  }
}
</style>
<!-- fdsafdsa -->