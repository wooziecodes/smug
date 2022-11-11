<template>
  <nav class="navbar">
    <img class="logo" @click="goHome" />
    <div class="input-container">
      <input class="form-control" placeholder="Search for modules here" id="searchBar" type="text" v-model="modules" @click="populateModules()"/>
      <ul class="dropdown" id="dropdown">
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
    <img :src="imgUrl" class="profile-pic" />
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
  setup() {
        const name = ref("");
  
        // onBeforeMount(() => {
        //   const user = firebase.auth().currentUser;
        //   if (user) {
        //     name.value = user.email.split('@')[0];
        //   }
        // });
  
        const Logout = () =>{
          firebase
            .auth()
            .signOut()
            .then(() => console.log("Signed out"))
            .catch(err => alert(err.message));
        }
        
        return{
          name,
          Logout
        }
    },
  data() {
    return {
      username: "",
      imgUrl: "",
      modules:[],
      modulesDropdown: []
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
    // async searchModules(search) {
    //   console.log(search)
    //   const q = query(collection(db, "module"), where("code", "==", true))
    //   console.log('yay')
    //   const querySnapshot = await getDocs(q)
    //   querySnapshot.forEach((doc) => {
    //     // this.modules.push(doc.data())
    //     var modName = doc.data().name
    //     var modCode = doc.data().code
    //     var modStr = modCode + ": " + modName
    //     console.log(modStr)
    //     this.modulesDropdown.push(modStr)

    //   })
    // },
    async populateModules(){
      const q = query(collection(db, "module"))
      console.log('yay')
      const querySnapshot = await getDocs(q)
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        console.log(doc.data().code)
        console.log(doc.data().name)
        var modName = doc.data().name
        var modCode = doc.data().code
        var modStr = modCode + ": " + modName
        console.log(modStr)
        this.modulesDropdown.push(modStr)
      })
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