<template>
  <div class="listing-container">
    <img v-bind:src="imgURL" />
    <div class="bottom-section">
      <div class="tutorInfo">
        <div class="d-flex justify-content-between align-items-center">
          <span class="tutorName">{{ tutor }}</span>
          <font-awesome-icon icon="fa-solid fa-heart" class="fa-heart" />
        </div>
        <span class="listingMod">{{ code }} - {{ mod }}</span>
        <span class="prof">Taught by Prof {{ prof }}</span>
        <div class="
            d-flex
            rating-prices
            justify-content-between
            align-items-center
          ">
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
import { ref, getDownloadURL } from "firebase/storage"

export default {
  data() {
    return {
      mod: "",
      rating: 0,
      imgURL: ""
    };
  },
  props: {
    tutor: String,
    code: String,
    prof: String,
    price: Number,
    userID: String,
  },
  created() {
    this.getModules();
    this.getRating(this.userID);
    
    getDownloadURL(ref(storage, "users/" + this.userID + ".jpg"))
      .then((url) => {
        this.imgURL = url
      })
  },
  mounted () {
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

    async getRating(userID) {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);
      this.rating = docSnap.data().rating
    }

  },
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
  background-color: #f3f9fb;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: box-shadow 0.3s;
}

.listing-container:hover {
  box-shadow: #59838a 0px 2px 6px;
}

.listing-container img {
  object-fit: cover;
  width: 90%;
  margin-top: 5%;
  margin-left: 5%;
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