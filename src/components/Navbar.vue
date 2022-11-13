<template>
  <nav class="navbar navbar-dark bg-white navbar-expand-md mb-3">
    <a class="navbar-brand" href="#">
      <img class="logo ml-3" @click="goHome" />
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-8"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon d-none"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbar-list-8">
      <div class="right-side d-flex">
      </div>
    </div>
    <img :src="imgUrl" class="profile-pic" @click="this.$router.push('/profile')" />
    <p class="greeting" style="margin-bottom: 0px">Hi, {{ username }}</p>
    <img class="icon-msg" :src="chatBtnSrc" @mouseenter="onHover" @mouseleave="onHover" style="max-width: 100%; max-height: 100%; width: 30px; height: 31px;"
      @click="openChat()" id="message-btn" />
    <button class="btn btn-sm logout" @click="Logout" type="button" id="start-btn">Logout</button>
  </nav>
</template>
<script>
import { db, auth, storage } from "../firebase/init"
import { onAuthStateChanged } from "firebase/auth"
import { getDocs, query, collection, where } from "firebase/firestore"
import { ref, getDownloadURL, listAll } from "firebase/storage"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
  data() {
    return {
      username: "",
      imgUrl: require("../assets/images/profile-placeholder.png"),
      chatBtnSrc: require('../assets/images/message-btn.svg')
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loadUser(user.uid)
      }
    })
  },
  methods: {
    async loadUser(uid) {
      const q = query(collection(db, "users"), where("uid", "==", uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.username = doc.data().user
        var listRef = ref(storage, "users")
        listAll(listRef)
          .then((res) => {
            res.items.forEach((itemRef) => {
              const prefix = itemRef.name.split(".")[0]
              if (prefix == doc.id) {
                getDownloadURL(ref(storage, "users/" + itemRef.name))
                  .then((url) => {
                    this.imgUrl = url
                  })
              }
            })
          })
      })
    },
    openChat() {
      this.$router.push({ name: 'Chat' })
    },
    goProfile() {
      this.$router.push({ name: 'profile' })
    },
    goHome() {
      this.$router.push({ name: 'Listings' })
    },
    onHover() {
      if (this.chatBtnSrc == require('../assets/images/message-btn.svg')) {
        this.chatBtnSrc = require('../assets/images/message-btn2.svg')
      } else {
        this.chatBtnSrc = require('../assets/images/message-btn.svg')
      }
    },
    Logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Signed out");
          this.$router.push({ name: 'Landing' })
        })
        .catch(err => alert(err.message));
    }

  }
}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

.logo {
  margin-left: 2%;
  height: 40px;
  content: url("../assets/images/smug-logo.png");
  cursor: pointer;
}

.profile-pic {
  width: 40px;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}

.profile-pic:hover,
#message-btn {
  cursor: pointer;
}

.input-container {
  margin-left: 5vw;
  width: 40%;
}

.greeting {
  font-family: "Open Sans", sans-serif;
  padding-left: 1%;
  padding-right: 1%
}

.fa-bookmark,
.fa-chat {
  height: 60%;
  color: #75acb4;
  cursor: pointer;
  width: 20%;
}

.fa-bookmark {
  margin-left: 5%;
}

.logout {
  font-family: "Open Sans";
  border-radius: 10px;
  background-color: #1F5C64;
  color: #ffffff;
  font-size: 1rem;
  padding: 0px 5px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
  margin-left: 1%;
}

.dropdown-item {
  background-color: white !important;
}

.dropdown-item:hover {
  background-color: #CEE1E6 !important;
}

#message-btn:hover {
  fill: #1F5C64;
}

@media only screen and (max-width: 991px) {
  .greeting {
    display: none;
  }
  .profile-pic{
    margin-left: 58vw;
  }
  .icon-msg{
    margin-left: 2vw;
    margin-right: 1vw;
  }
}
@media only screen and (max-width: 958px) {
  .profile-pic{
    margin-left: 56vw;
  }
}
@media only screen and (max-width: 922px) {
  .profile-pic{
    margin-left: 54vw;
  }
}
@media only screen and (max-width: 908px) {
  .profile-pic{
    margin-left: 53vw;
  }

}
@media only screen and (max-width: 876px) {
  .profile-pic{
    margin-left: 50vw;
  }
}
@media only screen and (max-width: 823px) {
  .profile-pic{
    margin-left: 48vw;
  }
}
@media only screen and (max-width: 790px) {
  .searchBar{
    width: 30px;
  }
  .profile-pic{
    margin-left: 46vw;
  }
}
@media only screen and (max-width: 768px) {
  .searchBar{
    width: 30px;
  }
  .profile-pic{
    margin-left: 44vw;
  }
}
@media only screen and (max-width: 767px) {
  .searchBar{
    width: 30px;
  }
  .profile-pic{
    margin-left: 42vw;
  }
}
@media only screen and (max-width: 740px) {
  .profile-pic{
    margin-left: 29vw;
  }
  .icon-msg{
    margin-left: -2vw;
    margin-right: -3vw;
  }
}
@media only screen and (max-width: 722px) {
  .profile-pic{
    margin-left: 18vw;
  }
  .icon-msg{
    margin-left: -6vw;
    margin-right: -7vw;
  }
}
@media only screen and (max-width: 677px) {
  .profile-pic{
    margin-left: 13vw;
  }
}@media only screen and (max-width: 637px) {
  .profile-pic{
    margin-left: 9vw;
  }
}
@media only screen and (max-width: 608px) {
  .greeting {
    display: none;
  }
  .icon-msg{
    margin-right: -6vw;
  }
  .profile-pic{
    margin-left: 12vw;
    margin-right: 0vw;
  }
}
@media only screen and (max-width: 580px) {
  .profile-pic{
    margin-left: 0vw;
  }
}
@media only screen and (max-width: 550px) {
  .icon-msg{
    margin-right: -7vw;
  }
  .profile-pic{
    margin-left: 0vw;
    margin-right: 0vw;
  }
}
@media only screen and (max-width: 493px) {
  .icon-msg{
    margin-right: -5vw;
  }
  .profile-pic{
    margin-left: 1vw;
    margin-right: 1vw;
  }
}
@media only screen and (max-width: 464px) {
  .icon-msg{
    margin-right: -3vw;
  }
  .profile-pic{
    margin-left: 1vw;
    margin-right: 3vw;
  }
}
@media only screen and (max-width: 437px) {
  .icon-msg{
    margin-right: -1vw;
  }
  .profile-pic{
    margin-left: 1vw;
    margin-right: 5vw;
  }
}
@media only screen and (max-width: 408px) {
  .icon-msg{
    margin-right: 2vw;
  }
  .profile-pic{
    margin-left: 1vw;
    margin-right: 7vw;
  }
}
@media only screen and (max-width: 439px) {
  .icon-msg{
    margin-right: -3vw;
  }
  .profile-pic{
    margin-left: -12vw;
    margin-right: 3vw;
  }
}
</style>