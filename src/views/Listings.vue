<template>
  <Navbar></Navbar>
  <div class="search-results container">
    <span class="results">search results for "IS111: Intro to Programming"</span>
    <div class="parent-container d-flex align-items-center">
      <div class="sort-container d-flex justify-content-between">
        <button type="button" class="btn btn-light">Recent</button>
        <button type="button" class="btn btn-light">Reviews</button>
        <button type="button" class="btn btn-light">
          <span>Price: High to Low</span>
          <font-awesome-icon icon="fa-solid fa-chevron-down" />
        </button>
        <button type="button" class="btn btn-light">
          <span> Price: Low to High</span>
          <font-awesome-icon icon="fa-solid fa-chevron-up" />
        </button>
      </div>
      <div class="vertical-rule"></div>
      <button type="button" class="btn btn-light">
        <span>More Filters</span>
        <font-awesome-icon icon="fa-solid fa-filter" />
      </button>
    </div>
  </div>
  <div class="listings-container container d-flex flex-wrap">
    <ListingComponent v-for="listing in listings" @listingId="openChat" class="listing-component" :id="listing.id" :tutor="listing.user" :code="listing.module"
      :prof="listing.prof" :price="listing.price" :userID="listing.userID"></ListingComponent>
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
import { getDocs, query, collection } from "firebase/firestore"
import { db } from "../firebase/init"
import Navbar from "../components/Navbar.vue";

export default {
  data() {
    return {
      listings: []
    };
  },
  created() {
    this.getListings();
  },
  methods: {
    async getListings() {
      const querySnap = await getDocs(query(collection(db, "listings")));
      querySnap.forEach((doc) => {
        let listing = doc.data()
        listing["id"] = doc.id
        this.listings.push(listing);
      });
    },
    openChat(e) {
      this.$router.push({name: 'Chat', params: { id: e }})
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

.parent-container {
  margin-top: 2%;
  height: 5vh;
}

.sort-container {
  width: 50%;
}

.btn {
  background-color: #f3f9fb !important;
}

.btn span {
  margin-right: 0.5vw;
}

.vertical-rule {
  width: 1vw;
  margin-right: 1vw;
  height: 3vh;
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
  flex-basis: 18%;
  margin-bottom: 2%;
  margin-left: 2%;
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
</style>