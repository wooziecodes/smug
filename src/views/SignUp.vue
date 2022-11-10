<template>

  <div id="body">
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form @submit.prevent="SignUp" action="#">
          <h1>Create Account</h1>
          <div class="social-container">
            <div class="errorMsg" v-if="SignUpError">
              {{ SignUpErrMsg }}
            </div>
          </div>
          <!-- <span>or use your email for registration</span> -->
          <!-- <input type="text" placeholder="Name" /> -->
          <input type="email" placeholder="Email" v-model="email" style="border-radius:8px" />
          <br>
          <input name="password1" type="password" placeholder="Password" v-model="password" style="border-radius:8px" />
          <br>
          <input name="password2" v-on:blur="validate" type="password" placeholder="Confirm Password"
            v-model="check_password" style="border-radius:8px" />

          <button type="submit" class="submit_button btn-light" style="margin-top:40px; border-radius:8px">Sign
            Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit.prevent="Login" action="#">
          <h1>Sign in</h1>
          <div class="social-container">
            <div class="errorMsg" v-if="LogInError" style="margin-bottom:5px">
              {{ LogInErrMsg }}
            </div>
            <!-- <a href="#" class="social"><i class="fab fa-facebook-f"></i></a> -->
            <button type="button" class="login-with-google-btn" @click="signInWithGoogle">
              Sign in with Google
            </button>

          </div>
          <!-- <span>or use your account</span> -->
          <input type="email" placeholder="Email" v-model="email" style="border-radius:8px" />
          <br>
          <input type="password" placeholder="Password" v-model="password" style="border-radius:8px" />
          <!-- <a href="#">Forgot your password?</a> -->
          <!-- <router-link to="forgot">Forgot your password?</router-link> -->
          <button type="submit" class="submit_button btn-light" style="margin-top:40px; border-radius:8px">Sign
            In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back to Smugger!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost btn" style="color:white" id="signIn">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <!-- <img src="../../images/logo.png" style="margin-left:50px" alt=""> -->
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost btn" style="color:white" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div>
      <img src="" alt="">
    </div> -->
  </div>
</template>

<script>
import { ref, mounted } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";
import router from "../router";
import { getDocs, query, collection, setDoc, doc, where } from "firebase/firestore"
import { db, auth } from "../firebase/init"

export default {
  setup() {
    // const username = ref("");
    const email = ref("");
    const password = ref("");
    const check_password = ref("");
    // const errMsg = ref();
    let SignUpErrMsg = ref(""); //ERROR MESSAGE
    let LogInErrMsg = ref(""); //ERROR MESSAGE
    let isError = ref(false);
    let SignUpError = ref(false);
    let LogInError = ref(false);

    const SignUp = () => {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
          alert("You have successfully signed up!");
          const newUser = {
            chats: [],
            email: data.user.email,
            rating: 0,
            uid: data.user.uid,
            user: data.user.email.split("@")[0]
          }
          const usersRef = collection(db, "users")
          setDoc(doc(usersRef), newUser).then((res) => {
            router.push({ name: "Listings" })
          });
          // console.log(password)
          // console.log(check_password)
          // this.$router.push('/views/login');
          // router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err.code);
          isError.value = true;
          SignUpError.value = true;
          // if(this.password !== this.check_password){
          //   errMsg.value = "The passwords does not match"
          // } else
          switch (err.code) {
            case "auth/email-already-in-use":
              SignUpErrMsg.value = "This email is already in use!";
              // console.log(SignUpErrMsg.value);
              break;
            case "auth/invalid-email":
              SignUpErrMsg.value = "Invalid email";
              // console.log(SignUpErrMsg.value);
              break;
            case "auth/invalid-password":
              SignUpErrMsg.value = "Password must be at least 6 characters";
              console.log(SignUpErrMsg.value);
              break;
            case "auth/weak-password":
              SignUpErrMsg.value = "Your password is too weak!";
              console.log(SignUpErrMsg.value);
              break;
            case "auth/too-many-requests":
              SignUpErrMsg.value = "Too many requests";
              // console.log(errMsg.value);

              break;
            default:
              SignUpErrMsg.value = "Email or password was incorrect";
              break;
          }
        });
    };


    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result)
          getDocs(query(collection(db, "users"), where("uid", "==", result.user.uid)))
            .then((querySnapshot) => {
              if (querySnapshot.docs == 0) {
                const newUser = {
                  chats: [],
                  email: result.user.email,
                  rating: 0,
                  uid: result.user.uid,
                  user: result.user.displayName
                }
                const usersRef = collection(db, "users")
                setDoc(doc(usersRef), newUser).then((res) => {
                  router.push({ name: "Listings" })
                });
              }
            })
        })
        .catch((error) => {
          console.log(error.msg);
        });
    };

    const Login = () => {
      signInWithEmailAndPassword(auth, email.value, password.value)
        // console.log(data)
        .then((data) => {
          console.log("success")
          alert("You have successfully Logged In!");
          // this.$router.push('/views/login');
          router.push({ name: "Listings" });
        })
        .catch((err) => {
          console.log(err)
          isError.value = true;
          LogInError.value = true;
          // if(this.password !== this.check_password){
          //   errMsg.value = "The passwords does not match"
          // } else
          switch (err.code) {
            case "auth/invalid-email":
              LogInErrMsg.value = "Invalid email";
              break;
            case "auth/user-not-found":
              LogInErrMsg.value = "No account with that email was found";
              break;
            case "auth/wrong-password":
              LogInErrMsg.value = "Incorrect password";
              break;
            case "auth/too-many-requests":
              LogInErrMsg.value = "Too many requests";
              // console.log(errMsg.value);

              break;
          }
        });

    };


    return {
      signInWithGoogle,
      Login,
      SignUp,
      email,
      password,
      check_password,
      SignUpErrMsg,
      LogInErrMsg,
      SignUpError,
      LogInError,
      isError
    };
  },
  mounted() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
      if (this.isError) {
        this.error = true;

      }
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
      this.error = false;
    });
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

#body {
  background: #E9EFF4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  /* margin: -20px 0 50px; */
}

.overlay-left {
  /* background: #f6f5f7; */
  /* background: black; */
  background-color: #1F5C64;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #1F5C64;
  background-color: #1F5C64;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: white;
  border: 1px #1F5C64 solid;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  /* border-image-source: linear-gradient(rgba(0, 51, 102, 0.5), rgba(0, 0, 51, 0.5));
  border-width: 5pt;
  border-image-slice: 1; */
}

input:focus {
  outline: 3px #1F5C64 solid;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #1F5C64, #1F5C64);
  background: linear-gradient(to right, #1F5C64, #1F5C64);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.submit_button:hover {
  color: #1F5C64;
  background-color: white;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}

.login-with-google-btn {
  transition: background-color .3s, box-shadow .3s;

  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);

  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;

}

.errorMsg {
  color: red;
}
</style>
