<template>


  <!-- Choi's work -->
  <nav class="navbar navbar-dark bg-white navbar-expand-md mt-3">
    <a class="navbar-brand" href="#">
      <img class="logo" @click="goHome" />
  
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-8" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon d-none"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbar-list-8">
  
      
      <div class="right-side d-flex">
        <!-- <form class="form-inline"> -->
  
        <div class="input-container">
          <input class="form-control" @focusin="searching = true" @focusout="searching = false" @keydown.enter="search" placeholder="Search for modules here" id="searchBar" type="text" v-model="searchStr"/>
  
          <ul class="dropdown" id="dropdown" v-if="searching" style="position:absolute">
              <li class="dropdown-item shadow" v-for="mod of modulesDropdown">{{mod}}</li>
          </ul>
        </div>
          
  
        <!-- </form> -->
        <!-- <ul class="navbar-nav">
            <li class="nav-item">
  
          </li>   
        </ul> -->
      </div>
      
    </div>
    <!-- <font-awesome-icon icon="fas fa-comment-dots" class="fa-chat mr-2 fa-lg" style="width: min-content;" @click="openChat()" /> -->
  
      <img :src="imgUrl" class="profile-pic" @click="this.$router.push('/profile')"/>
      <p class="greeting" style="margin-bottom: 0px" @click="this.$router.push('/profile')">Hi, {{ username }}</p>
  
    <img :src="require('../assets/images/message-btn.png')" style="max-width: 100%; max-height: 100%;" @click="openChat()" id="message-btn" />
    
    
  
    <!-- <div class="right-side d-flex flex-row-reverse"> -->
      <button class="btn logout" @click="Logout" type="button" id="start-btn">Logout</button>
  
      
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
        searching: false
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
        this.$router.push({ name: "Listings", params: { query: this.searchStr }})
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
  
  .logo {
    margin-left: 2%;
    height: 40px;
    content: url("../assets/images/smug-logo.png");
    cursor: pointer;
  }
  
  .form-control{
    /* margin-top: 27px; */
  }
  
  .profile-pic {
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
  }
  
  .profile-pic:hover, .greeting:hover, #message-btn {
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
  .logout{
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
  .greeting{
    /* width: 100px; */
  }
  
  .dropdown-item{
    background-color: white !important;
  }
  
  .dropdown-item:hover{
    background-color: #CEE1E6 !important;
  }
  </style>