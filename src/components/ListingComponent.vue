<template>
  <div class="listing-container">
    <img :src="listingImg" class="listingImg" @click="sendId" />
    <div class="bottom-section">
      <div class="tutorInfo">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex" @click="sendId">
            <img v-bind:src="tutorImg" class="tutorImg" />
            <span class="tutorName">&nbsp;{{ tutor }}</span>
          </div>
          <font-awesome-icon icon="fa-solid fa-heart" class="fa-heart" @click="bookmarked" />
        </div>
        <span class="listingMod" @click="sendId">{{ code }} - {{ mod }}</span>
        <span class="prof" @click="sendId">Taught by Prof {{ prof }}</span>
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
import { getDocs, query, collection, getDoc, doc } from "firebase/firestore"
import { db, storage } from "../firebase/init"
import { ref, getDownloadURL, listAll } from "firebase/storage"

export default {
  data() {
    return {
      mod: "",
      rating: 0,
      listingImg: "",
      tutorImg: "",
      userID: ""
    };
  },
  props: {
    id: String,
    tutor: String,
    code: String,
    prof: String,
    price: Number,
    uid: String,
  },
  created() {
    this.getModules();
    this.getRating();
    console.log(this.uid)
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
  mounted() {
    // Sticky headesr
    $(window).on('scroll', () => {
      this.scrolled = $(window).scrollTop() > 20
    })
  },
  methods: {
    async getModules() {
      const querySnap = await getDocs(query(collection(db, "module")));
      querySnap.forEach((doc) => {
        if (this.code == doc.data().code) {
          if (doc.data().name.length > 15) {
            this.mod = doc.data().name.slice(0, 15) + "..."
          } else {
            this.mod = doc.data().name
          }
        }
      });
    },

    async getRating() {
      const querySnap = await getDocs(query(collection(db, "users")));
      querySnap.forEach((doc) => {
        if (doc.data().uid == this.uid) {
          this.rating = doc.data().rating
          this.userID = doc.id
        }
      });
    },
    sendId() {
      this.$emit("listingId", this.id)
    },
    bookmarked() {
      this.$emit("bookmarked", this.id)
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
  width: 25%;
  height: 45vh;
  background-color: #f3f9fb;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: box-shadow 0.3s;
  cursor: pointer;
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
  margin-top: 2vh;
}

.bottom-section {
  width: 90%;
  margin: 5%;
}

.tutorName {
  color: #75acb4;
  font-size: 1.4vw;
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
}

.fa-heart {
  color: #75acb4;
}

.fa-star:hover,
.fa-heart:hover {
  cursor: pointer;
}
</style>