<template>
    <div class="signup">
      <div class="links">
      <router-link to="/login" class="logInLink">Login</router-link> |
      <router-link to="/signup" class="signUpLink">Sign Up</router-link> 
      </div>
      <h1>Sign Up</h1>
      <form @submit.prevent="SignUp">
      <p><input type="email" placeholder="Email" v-model="email"></p>
      <p><input type="password" placeholder="Password" v-model="password"></p>
      <p><input type="submit" value="SignUp"></p>
      <p>Already have an account? <router-link to="/login">Login Here</router-link></p>
      <!-- <p><button @click="signInWithGoogle">Sign In with Google</button></p> -->
    </form>
    </div>
  </template>
  
  <script>
    import { ref } from 'vue';
    import { 
        getAuth,
        createUserWithEmailAndPassword,
        
    } from "firebase/auth";
    import router from '../router';
    // import { userRouter } from 'vue-router';
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    import 'firebase/compat/firestore';

  export default {
    setup() {
        const email = ref("");
        const password = ref("");
        const auth = getAuth(); //AUTHENTICATE

        const SignUp = () => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then((data) => {
                    alert("You have successfully signed up!");
                    console.log(auth.currentUser)
                    // this.$router.push('/views/login');
                    router.push({ name: 'Login'})
                })
                .catch(err => 
                alert(err.message));
        }

        
        

        return {
            SignUp,
            email,
            password,
    
        }
        
    }
  }
  </script>
  
  <style>
  .signup{
    /* background-color: black; */
    color: black;
    margin: auto;
    margin-top: 200px;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
  }
  .signUpLink{
    text-decoration: none;
    border-bottom: 2px solid;
    border-bottom-style: solid;
    padding-bottom: 3px;
  }
  .logInLink{
    text-decoration: none;
    border-bottom: 2px solid;
    border-bottom-style: solid;
    padding-bottom: 3px;
  }
  .links{
    margin-bottom: 15px;
  }
  </style>
