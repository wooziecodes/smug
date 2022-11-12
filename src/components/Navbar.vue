<template>


  <!-- Choi's work -->
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

        <!-- <div class="input-container">
          <input class="searchBar form-control" style="width: 393px;" @focusin="searching = true" @focusout="searching = false" @keydown.enter="search"
            placeholder="Search for modules here" id="searchBar" type="text" v-model="searchStr" />

          <ul class="dropdown" id="dropdown" v-if="searching" style="position:absolute">
            <li class="dropdown-item shadow" v-for="mod of modulesDropdown">{{ mod }}</li>
          </ul>
        </div> -->

      </div>

    </div>
    <!-- <font-awesome-icon icon="fas fa-comment-dots" class="fa-chat mr-2 fa-lg" style="width: min-content;" @click="openChat()" /> -->
    
    <img :src="imgUrl" class="profile-pic" @click="this.$router.push('/profile')" />
    <p class="greeting" style="margin-bottom: 0px">Hi, {{ username }}</p>

    <img class="icon-msg" :src="chatBtnSrc" @mouseenter="onHover" @mouseleave="onHover" style="max-width: 100%; max-height: 100%; width: 30px; height: 31px;"
      @click="openChat()" id="message-btn" />



    <!-- <div class="right-side d-flex flex-row-reverse"> -->
    <button class="btn btn-sm logout" @click="Logout" type="button" id="start-btn">Logout</button>


    <!-- </div>  -->
  </nav>

  <!-- Elijah's work -->
  <!-- <div class="container-fluid">
      <div class="row">
        <nav class="navbar">
          
          <div class="col">
            <img class="logo" @click="goHome" />
          </div>
  
          <div class="col">
            <div class="input-container">
            <input class="form-control" @focusin="searching = true" @focusout="searching = false" @keydown.enter="search" placeholder="Search for modules here" id="searchBar" type="text" v-model="searchStr"/>
            <ul class="dropdown" id="dropdown" v-if="searching" style="position:absolute">
              <li class="dropdown-item shadow-sm" v-for="mod of modulesDropdown">{{mod}}</li>
            </ul>
            </div>
          </div>
  
          <div class="col">
            <span class="greeting">Hi, {{ username }}</span>
            <img :src="imgUrl" class="profile-pic" @click="this.$router.push('/profile')"/>
          </div>
  
          <div class="col">
            <button class="logout" @click="Logout">Logout</button>
          </div>
          <div class="col">
            <font-awesome-icon icon="fas fa-comment-dots" class="fa-chat" @click="openChat()" />
          </div>
            
        </nav>
      </div>
    </div> -->

</template>
<script>
import { db, auth, storage } from "../firebase/init"
import { onAuthStateChanged } from "firebase/auth"
import { getDocs, query, collection, where, orderBy } from "firebase/firestore"
import { ref, getDownloadURL, listAll } from "firebase/storage"
import { onBeforeMount } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
  data() {
    return {
      username: "",
      imgUrl: "",
      searchStr: "",
      modules: [],
      modulesDropdown: [],
      searching: false,
      chatBtnSrc: require('../assets/images/message-btn.svg')
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loadUser(user.uid)
      }
    })
    this.populateModules()
  },
  watch: {
    searchStr(value) {
      this.modulesDropdown = []
      for (var mod of this.modules) {
        if (mod.toLowerCase().includes(value.toLowerCase())) {
          this.modulesDropdown.push(mod)
        }
      }
    }
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
    async populateModules() {
      const q = query(collection(db, "module"), orderBy("code"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        var modName = doc.data().name
        var modCode = doc.data().code
        var modStr = modCode + ": " + modName
        this.modules.push(modStr)
      })
    },
    search() {
      this.$router.push({ name: "Listings", params: { query: this.searchStr } })
      this.$emit("search", this.searchStr)
      this.$emit("searchedMods", this.modulesDropdown)
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

/* .navbar {
    font-family: "Open Sans";
    position: relative;
    display: flex;
    width: 100%;
    height: 10vh;
    max-height: 40px;
    align-items: center;
  } */
/* #start-btn{
  border-radius: 12%;
} */
.logo {
  margin-left: 2%;
  height: 40px;
  content: url("../assets/images/smug-logo.png");
  cursor: pointer;
}

.form-control {
  /* margin-top: 27px; */
  /* width: 500px; */
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

#searchBar {
  color: black;
  background-color: white;
  width: 370px;
}

#searchBar::placeholder {
  color: grey;
}

.greeting {
  /* margin-left: 4%; */
  /* width: auto; */
  font-family: "Open Sans", sans-serif;
  /* font-size: 10px; */
  /* margin-right: 4%; */
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

.fa-chat {
  /* margin-left: 2%; */
  /* margin-top: 5%; */
  /* width: 40px; */
  /* size: 2vh; */
}

.logout {
  font-family: "Open Sans";

  border-radius: 10px;
  /* border: 1px solid #1F5C64; */
  background-color: #1F5C64;
  color: #ffffff;
  font-size: 1rem;
  /* font-weight: bold; */
  padding: 0px 5px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
  /* margin-right: 10%; */
  margin-left: 1%;
}

.greeting {
  /* width: 100px; */
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
  body {
    /* background-color: lightblue; */
  }
  /* .searchBar{
    margin-top: 2vw;
  } */
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
  /* .searchBar{
    width: 10vw !important;
  } */
}
@media only screen and (max-width: 958px) {
  body {
    /* background-color: lightblue; */
  }
  .profile-pic{
    margin-left: 56vw;
  }
}
@media only screen and (max-width: 922px) {
  body {
    /* background-color: lightblue; */
  }
  .profile-pic{
    margin-left: 54vw;
  }
}
@media only screen and (max-width: 908px) {
  body {
    /* background-color: lightblue; */
  }
  .profile-pic{
    margin-left: 53vw;
  }

}
@media only screen and (max-width: 876px) {
  body {
    /* background-color: lightblue; */
  }
  .profile-pic{
    margin-left: 50vw;
  }
}
@media only screen and (max-width: 823px) {
  body {
    /* background-color: lightblue; */
  }
  .profile-pic{
    margin-left: 48vw;
  }
}
@media only screen and (max-width: 790px) {
  body {
    /* background-color: lightblue; */
  }
  .searchBar{
    width: 30px;
  }
  .profile-pic{
    margin-left: 46vw;
  }
}
@media only screen and (max-width: 768px) {
  body {
    /* background-color: lightblue; */
  }
  .searchBar{
    width: 30px;
  }
  .profile-pic{
    margin-left: 44vw;
  }
}
@media only screen and (max-width: 767px) {
  body {
    /* background-color: lightblue; */
  }
  .searchBar{
    width: 30px;
  }
  .profile-pic{
    margin-left: 42vw;
  }
}
@media only screen and (max-width: 740px) {
  body {
    /* background-color: lightblue; */
  }

  .profile-pic{
    margin-left: 29vw;
  }
  .icon-msg{
    margin-left: -2vw;
    margin-right: -3vw;
  }
}
@media only screen and (max-width: 722px) {
  body {
    /* background-color: lightblue; */
  }
  .profile-pic{
    margin-left: 18vw;
  }
  .icon-msg{
    margin-left: -6vw;
    margin-right: -7vw;
  }
}
@media only screen and (max-width: 677px) {
  body {
    /* background-color: lightblue; */
  }
  .profile-pic{
    margin-left: 13vw;
  }
}@media only screen and (max-width: 637px) {
  body {
    /* background-color: lightblue; */
  }
  .profile-pic{
    margin-left: 9vw;
  }
}
@media only screen and (max-width: 608px) {
  body {
    /* background-color: lightblue; */
  }
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
  body {
    /* background-color: lightblue; */
  }
  .profile-pic{
    margin-left: 0vw;
  }
}
@media only screen and (max-width: 550px) {
  body {
    /* background-color: lightblue; */
  }
  .logo{
    /* size: 60%; */
    /* width: 60%;
    height: 60%; */
    /* width: 20vw; */
  }

  .icon-msg{
    margin-right: -7vw;
  }
  .profile-pic{
    margin-left: 0vw;
    margin-right: 0vw;
  }
}
@media only screen and (max-width: 493px) {
  body {
    /* background-color: lightblue; */
  }
  .logo{
    /* size: 60%; */
    /* width: 60%;
    height: 60%; */
    /* width: 20vw; */
  }

  .icon-msg{
    margin-right: -5vw;
  }
  .profile-pic{
    margin-left: 1vw;
    margin-right: 1vw;
  }
}
@media only screen and (max-width: 464px) {
  body {
    /* background-color: lightblue; */
  }
  .logo{
    /* size: 60%; */
    /* width: 60%;
    height: 60%; */
    /* width: 20vw; */
  }

  .icon-msg{
    margin-right: -3vw;
  }
  .profile-pic{
    margin-left: 1vw;
    margin-right: 3vw;
  }
}
@media only screen and (max-width: 437px) {
  body {
    /* background-color: lightblue; */
  }
  .logo{
    /* size: 60%; */
    /* width: 60%;
    height: 60%; */
    /* width: 20vw; */
  }

  .icon-msg{
    margin-right: -1vw;
  }
  .profile-pic{
    margin-left: 1vw;
    margin-right: 5vw;
  }
}
@media only screen and (max-width: 408px) {
  body {
    /* background-color: lightblue; */
  }
  .logo{
    /* size: 60%; */
    /* width: 60%;
    height: 60%; */
    /* width: 20vw; */
  }

  .icon-msg{
    margin-right: 2vw;
  }
  .profile-pic{
    margin-left: 1vw;
    margin-right: 7vw;
  }
}
@media only screen and (max-width: 439px) {
  body {
    /* background-color: lightblue; */
  }
  .logo{
    /* size: 60%; */
    /* width: 60%;
    height: 60%; */
    /* width: 20vw; */
  }

  .icon-msg{
    margin-right: -3vw;
  }
  .profile-pic{
    margin-left: -12vw;
    margin-right: 3vw;
  }
}
</style>