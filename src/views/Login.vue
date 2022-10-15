<template>
    <div>
    <div class="signup">
      <div class="links"> 
        <router-link to="/login" class="logInLink">Login</router-link> |
        <router-link to="/signup" class="signUpLink">Sign Up</router-link> 
      </div> 
      <h1>Login</h1>
      <form @submit.prevent="Login">
      <p><input type="email" placeholder="Email" v-model="email"></p>
      <p><input type="password" placeholder="Password" v-model="password"></p>
      <p class="errorMsg" v-if="error">{{ errMsg }}</p>
      <p><input type="submit" value="Login"></p>
      <p>Don't have an account? <router-link to="/signup">Register Here</router-link></p>
      <p><button @click="signInWithGoogle">Sign In with Google</button></p>
      <p><button @click="signInWithMicrosoft">Sign In with Microsoft</button></p>
      </form>
    </div>
    </div>
  </template>
  
  
  <script>
  // import firebase from "firebase";
  // src='https://cdn.firebase.com/js/client/2.2.1/firebase.js';
  import {ref} from 'vue';
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider,
        signInWithPopup, OAuthProvider} from "firebase/auth";

  import router from '../router';

//   import * as firebase from "firebase";
// v9 compat packages are API compatible with v8 code
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    import 'firebase/compat/firestore';
  
  export default {
      setup() {
        
          let email = ref("");
          let password = ref("");
          let auth = getAuth(); //AUTHENTICATE
          let errMsg = ref(""); //ERROR MESSAGE
          let error = ref(false);
  

          const signInWithGoogle = () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
            .then((result) => {
                console.log(result.user);
                router.push({ name: 'home'})
            })
            .catch((error) => {
                console.log(error.msg);
            });
            }
            
          const signInWithMicrosoft = () => {
            const provider = new OAuthProvider('microsoft.com');
            signInWithPopup(getAuth(), provider)
            provider.setCustomParameters({
                // Force re-consent.
                prompt: 'consent',
                // Target specific email with login hint.
                login_hint: 'user@smu.edu.sg'
            })
            .then((result) => {
                const credential = OAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                const idToken = credential.idToken;
            })
            .catch((error) => {
                console.log(error.msg);
            });
        }

          const Login = () => {
          firebase
              .auth()
              .signInWithEmailAndPassword(email.value, password.value)
              // console.log(data)
              .then((data) => {
                    alert("You have successfully Logged In!");
                    // this.$router.push('/views/login');
                    router.push({ name: 'home'})
                })
                .catch((err) => {
                    // console.log(err.code);
                    error.value = true;
                    switch (err.code) {
                        // case "auth/invalid-email":
                        //     errMsg.value = "Invalid email";
                        //     break;
                        // case "auth/user-not-found":
                        //     errMsg.value = "No account with that email was found";
                        //     break;
                        // case "auth/wrong-password":
                        //     errMsg.value = "Incorrect password";
                        //     break;
                        // case "auth/too-many-requests":
                        //     errMsg.value = "Too many requests";
                        //     // console.log(errMsg.value);

                        //     break;
                        // default:
                        //     errMsg.value = "Email or password was incorrect";
                        //     break;
                }
                });
               
          }
          
          return {
              signInWithGoogle,
              signInWithMicrosoft,
              Login,
              email,
              password,
              errMsg,
              error,
          }
      }
  };
  </script>
  
  <style>
    .errorMsg{
        color: red;
    }
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
 
