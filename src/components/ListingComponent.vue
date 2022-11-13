<template>
  <div class="listing-container">
    <img :src="listingImg" class="listingImg" @click="sendId" />
    <div class="bottom-section">
      <div class="tutorInfo">
        <div class="d-flex align-items-center">
          <div class="d-flex" @click="sendId">
            <img v-bind:src="tutorImg" class="tutorImg" />
            <span class="tutorName">&nbsp;{{ tutor }}</span>
          </div>
          <div v-if="!isOwn">
            <font-awesome-icon v-if="isBookmarked" icon="fa-solid fa-heart" class="fa-heart" @click="unbookmarked" />
            <font-awesome-icon v-if="!isBookmarked" @mouseenter="onHover" @mouseleave="onHover" :icon="heartIcon"
              class="fa-heart" @click="bookmarked" />
          </div>
        </div>
        <span class="listingMod" @click="sendId">{{ code }} - {{ mod }}</span>
        <span class="prof" @click="sendId">Prof {{ prof }}</span>
        <div class="
            d-flex
            rating-prices
            justify-content-between
            align-items-center
          " @click="sendId">
          <span class="price">${{ price }}/hr</span>
          <div class="ratings-container d-flex align-items-center">
            <font-awesome-icon icon="fa-solid fa-star" class="fa-star" />
            <span class="rating">&nbsp;{{ rating }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDocs, query, collection, where } from "firebase/firestore"
import { db, storage, auth } from "../firebase/init"
import { ref, getDownloadURL, listAll } from "firebase/storage"
import { onAuthStateChanged } from "@firebase/auth";

export default {
  data() {
    return {
      mod: "",
      rating: 0,
      listingImg: require("../assets/images/module-placeholder.png"),
      tutorImg: require("../assets/images/profile-placeholder.png"),
      userID: "",
      isBookmarked: false,
      heartIcon: ["fa-regular", "fa-heart"]
    };
  },
  props: {
    id: String,
    tutor: String,
    code: String,
    prof: String,
    price: Number,
    uid: String,
    isOwn: false
  },
  created() {
    if (!this.uid) {
      onAuthStateChanged(auth, (user) => {
        this.getRating(user.uid)
        this.getBookmarked(user.uid);
      })
    } else {
      onAuthStateChanged(auth, (user) => {
        this.getBookmarked(user.uid)
      })
      this.getRating(this.uid)
    }
    this.getModules();
    var listRef = ref(storage, "listings")
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          const prefix = itemRef.name.split(".")[0]
          if (prefix == this.id) {
            getDownloadURL(ref(storage, "listings/" + itemRef.name))
              .then((url) => {
                this.listingImg = url
              })
          }
        })
      })

    var userRef = ref(storage, "users")
    listAll(userRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          const prefix = itemRef.name.split(".")[0]
          if (prefix == this.userID) {
            getDownloadURL(ref(storage, "users/" + itemRef.name))
              .then((url) => {
                this.tutorImg = url
              })
          }
        })
      })
  },
  methods: {
    async getModules() {
      const querySnap = await getDocs(query(collection(db, "module")));
      querySnap.forEach((doc) => {
        if (this.code == doc.data().code) {
          if (doc.data().name.length > 9) {
            this.mod = doc.data().name.slice(0, 10) + "..."
          } else {
            this.mod = doc.data().name
          }
        }
      });
    },
    async getBookmarked(uid) {
      const querySnap = await getDocs(query(collection(db, "users"), where("uid", "==", uid)));
      querySnap.forEach((doc) => {
        if (doc.data().uid == uid) {
          console.log(doc.data())
          console.log(this.id)
          if (doc.data().bookmarked.includes(this.id)) {
            this.isBookmarked = true
          }
        }
      }
      );
    },
    async getRating(uid) {
      const querySnap = await getDocs(query(collection(db, "users")));
      querySnap.forEach((doc) => {
        if (doc.data().uid == uid) {
          this.rating = doc.data().rating.toFixed(2)
          this.userID = doc.id
        }
      });
    },
    sendId() {
      this.$emit("listingId", this.id)
    },
    bookmarked() {
      this.isBookmarked = true
      this.$emit("bookmarked", this.id)
    },
    unbookmarked() {
      this.isBookmarked = false
      this.$emit("unbookmarked", this.id)
    },
    onHover() {
      if (this.heartIcon.includes("fa-regular")) {
        this.heartIcon = ["fa-solid", "fa-heart"]
      } else {
        this.heartIcon = ["fa-regular", "fa-heart"]
      }
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

* {
  margin: 0;
  padding: 0;
  text-align: start;
}

.listing-container {
  border-radius: 5px;
  height: 25vw;
  background-color: #f3f9fb;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: box-shadow 0.3s;
  cursor: pointer;
  margin: 20px;
}

.listing-container:hover {
  box-shadow: #59838a 0px 2px 6px;
}

.listingImg {
  object-fit: cover;
  width: 90%;
  height: 55%;
  margin-top: 5%;
  margin-left: 5%;
}

.tutorImg {
  object-fit: cover;
  width: 17%;
  border-radius: 50%;
}

.listingMod {
  margin-top: 5%;
}

.bottom-section {
  width: 90%;
  margin: 5%;
}

.tutorName {
  color: #75acb4;
  font-size: 1.2vw;
  display: block;
}

.listingMod {
  display: block;
  color: #1f5c64;
  font-size: 1.1vw;
  font-weight: bold;
}

.rating-prices {
  margin-top: 1vh;
}

.prof {
  display: block;
  color: #7c7c7c;
  font-size: 1vw;
  font-weight: 600;
}

.price {
  color: #7c7c7c;
  font-weight: 600;
  font-size: 1vw;
}

.rating {
  color: #75acb4;
  font-size: 1vw;
}

.fa-star {
  color: #75acb4;
  font-size: 1.5vw
}

.fa-heart {
  margin-top: 0.5vw;
  color: #75acb4;
  font-size: 1.5vw;
}

.fa-star:hover,
.fa-heart:hover {
  cursor: pointer;
}

@media only screen and (max-width: 991px) {
  .listing-container {
    height: 30vw;
  }
}

@media only screen and (max-width: 646px) {
  .tutorName {
    font-size: 2vw
  }

  .listingMod,
  .prof,
  .price,
  .rating {
    font-size: 1.4vw
  }

  .listing-container {
    height: 38vw
  }

  .fa-star,
  .fa-heart {
    font-size: 2vw
  }
}

@media only screen and (max-width: 513px) {
  .tutorName {
    font-size: 3vw
  }

  .listingMod,
  .prof,
  .price,
  .rating {
    font-size: 2vw
  }

  .listing-container {
    height: 50vw
  }

  .fa-star,
  .fa-heart {
    font-size: 3vw
  }
}

@media only screen and (max-width: 393px) {

  .listingMod,
  .prof,
  .price,
  .rating {
    font-size: 2.3vw
  }

  .listing-container {
    height: 55vw
  }
}

@media only screen and (max-width: 363px) {

  .listingMod,
  .prof,
  .price,
  .rating {
    font-size: 2.5vw
  }

  .listing-container {
    height: 60vw
  }
}

@media only screen and (max-width: 337px) {
  .tutorName {
    font-size: 6vw
  }

  .listingMod,
  .prof,
  .price,
  .rating {
    font-size: 4vw
  }

  .listing-container {
    height: 100vw
  }

  .fa-star,
  .fa-heart {
    font-size: 6vw
  }
}
</style>