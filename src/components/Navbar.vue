<template>



<nav class="navbar navbar-dark bg-white navbar-expand-md mt-3">
  <a class="navbar-brand" href="#">
    <img class="logo" @click="goHome" />

  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-8" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon d-none"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-between" id="navbar-list-8">
    <!-- <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About Us</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Blog</a>
      </li>
    </ul> -->
    
    <div class="right-side d-flex">
      <form class="form-inline">
        <!-- <input class="form-control mr-2" type="search" placeholder="Search" aria-label="Search"> -->
        <input class="form-control mr-2" @focusin="searching = true" @focusout="searching = false" @keydown.enter="search" placeholder="Search for modules here" id="searchBar" type="text" v-model="searchStr"/>

        <ul class="dropdown" id="dropdown" v-if="searching" style="position:absolute">
            <li class="dropdown-item" v-for="mod of modulesDropdown">{{mod}}</li>
        </ul>
        <!-- <font-awesome-icon  size="1x" icon="fas fa-comment-dots" class="fa-chat" @click="openChat()" /> -->

        <!-- <button class="btn btn-info" type="submit"><i class="fas fa-search"></i></button> -->
      </form>
      <ul class="navbar-nav">
          <li class="nav-item">
          <!-- <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> -->
            <!-- <font-awesome-icon  size="5x" icon="fas fa-comment-dots" class="fa-chat" @click="openChat()" /> -->


          <!-- </a> -->
          <!-- <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">Dashboard</a>
            <a class="dropdown-item" href="#">Edit Profile</a>
            <a class="dropdown-item" href="#">Log Out</a>
          </div> -->
        </li>   
      </ul>
    </div>
    
  </div>
  <!-- <span class="greeting">Hi, {{ username }}</span> -->
  <font-awesome-icon icon="fas fa-comment-dots" class="fa-chat mr-2 fa-lg" style="width: min-content;" @click="openChat()" />

  <div class="right-side d-flex flex-row-reverse">
    <button class="btn logout" @click="Logout" type="button" id="start-btn">Logout</button>

    <!-- <button class="logout" @click="Logout">Logout</button> -->
    <img :src="imgUrl" width="40" @click="goProfile()" height="40" class="profile-pic rounded-circle mr-2">
    <!-- <font-awesome-icon icon="fas fa-comment-dots" size="lg" class="fa-chat" @click="openChat()" /> -->
  </div>
</nav>

  <!-- <nav class="navbar .ml-auto navbar-dark bg-light navbar-expand-sm mt-3">
    <a href="#" class="navbar-brand">
      <img class="logo" @click="goHome" />
    </a>


    <div class="input-container ml-auto">
          <input class="form-control" @focusin="searching = true" @focusout="searching = false" @keydown.enter="search" placeholder="Search for modules here" id="searchBar" type="text" v-model="searchStr"/>
          <ul class="dropdown" id="dropdown" v-if="searching" style="position:absolute">
            <li class="dropdown-item" v-for="mod of modulesDropdown">{{mod}}</li>
          </ul>
          </div>
    <span>
      Hi, {{username}}
    </span>
    <span class="custom-navbar-image ml-auto">
      <img :src="imgUrl" width="40" height="40" class="rounded-circle">
    </span>
    <button class="logout" @click="Logout">Logout</button>
    <font-awesome-icon icon="fas fa-comment-dots" class="fa-chat" @click="openChat()" />


  </nav> -->

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
            <li class="dropdown-item" v-for="mod of modulesDropdown">{{mod}}</li>
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
  width: 45px;
  height: 85%;
  border-radius: 50%;
}

.profile-pic:hover {
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
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  /* margin-right: 10%; */
}
.greeting{
  /* width: 100px; */
}
</style>