<template>
  <!-- <nav>
    <img src="./assets/smug-logo.svg" class="logo" />
    <div class="w-50">
      <input
        class="form-control"
        placeholder="Search for modules here"
        id="searchBar"
        type="text"
      />
    </div>
    <span>Hi, Oppa</span>
    <font-awesome-icon
      icon="fa-solid fa-bookmark"
      class="fa-bookmark"
      @click="showListings = !showListings"
    />
    <font-awesome-icon
      icon="fas fa-comment-dots"
      class="fa-chat"
      @click="showChat = !showChat"
    />
  </nav> -->
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
// import { firebase } from 'firebase';
// import * as firebase from "firebase/app"
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import TheNavbar from './views/TheNavbar'
import Landing from './views/Landing'
import 'animate.css';
import 'aos/dist/aos.css'
import wow from 'wowjs';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import AOS from 'aos'
import 'aos/dist/aos.css'



// import TheBrands from './components/TheBrands'
// import TheFeatures from './components/TheFeatures'
// import TheAbout from './components/TheAbout'
// import TheFacts from './components/TheFacts'
// import TheTestimonials from './components/TheTestimonials'
// import ThePosts from './components/ThePosts'
// import TheFooter from './components/TheFooter'
// import BackToTopButton from './components/BackToTopButton'

const firebaseConfig = {
  apiKey: "AIzaSyCIs-jCOTCgMspvCH3C3EKd_rszakumjyY",
  authDomain: "smug-6af00.firebaseapp.com",
  databaseURL:
    "https://smug-6af00-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smug-6af00",
  storageBucket: "smug-6af00.appspot.com",
  messagingSenderId: "528889510749",
  appId: "1:528889510749:web:f69e557a590d0f9add06b4",
  measurementId: "G-EWRYTVZDC5",
};

firebase.initializeApp(firebaseConfig);

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });
  },
  components:{

  },
  data() {
    return {
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");


body {
  background: #2c3e50;
  color: #FFF;
}
#app {
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  
}

a {
  color: inherit;
}

nav {
  display: flex;
  width: 100%;
  height: 10vh;
  align-items: center;
}

nav .logo {
  margin-left: 2%;
  height: 40px;
}

nav .pfp {
  margin-left: 2%;
  height: 50%;
  border-radius: 50%;
}

nav .w-50 {
  margin-left: 2%;
  height: 40%;
}

#searchBar {
  color: white;
  background-color: #75acb4;
}

#searchBar::placeholder {
  color: white;
}

nav span {
  margin-left: 10%;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2vw;
}

.fa-bookmark,
.fa-chat {
  height: 30%;
  color: #75acb4;
  cursor: pointer;
}

.fa-bookmark {
  margin-left: 5%;
}

.fa-chat {
  margin-left: 2%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>