<template>
  <nav class="navbar">
    <img class="logo" @click="goHome" />
    <div class="input-container">
      <input class="form-control" @focusin="searching = true" @focusout="searching = false" @keydown.enter="search" placeholder="Search for modules here" id="searchBar" type="text" v-model="searchStr"/>
      <ul class="dropdown" id="dropdown" v-if="searching">
        <li class="dropdown-item" v-for="mod of modulesDropdown">{{mod}}</li>
      </ul>
      <!-- <div class="dropdown">
        <ul class="dropdown-menu">
          <li><a v-for="mod in modules" class="dropdown-item" href="#">{{mod}}</a></li>
        </ul>
      </div> -->

<!-- 
      <p v-text="modulesDropdown"></p> -->

        <!-- <p v-for="mod in modules">{{mod}}</p> -->
      
    </div>
    <span class="greeting">Hi, {{ username }}</span>
    <img :src="imgUrl" class="profile-pic" @click="this.$router.push('/profile')"/>
    <button class="logout" @click="Logout">Logout</button>
    <font-awesome-icon icon="fas fa-comment-dots" class="fa-chat" @click="openChat()" />
  </nav>
</template>
<script>
import { db, auth, storage } from "../firebase/init"
import { onAuthStateChanged } from "firebase/auth"
import { getDocs, query, collection, where, onSnapshot } from "firebase/firestore"
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
      } else {
        console.log("Not signed in")
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
      const q = query(collection(db, "module"))
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
    goHome() {
      this.$router.push({ name: 'Listings' })
    },

  }
}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

.navbar {
  display: flex;
  width: 100%;
  height: 10vh;
  align-items: center;
}

.logo {
  margin-left: 2%;
  height: 40px;
  content: url("../assets/images/smug-logo.png");
  cursor: pointer;
}

.profile-pic {
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
  color: white;
  background-color: #75acb4;
}

#searchBar::placeholder {
  color: white;
}

.greeting {
  margin-left: 2%;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2vw;
}

.fa-bookmark,
.fa-chat {
  height: 60%;
  color: #75acb4;
  cursor: pointer;
}

.fa-bookmark {
  margin-left: 5%;
}

.fa-chat {
  margin-left: 2%;
}
</style>