<template>
  <Navbar></Navbar>

  <!-- <div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown link
  </a>

  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div> -->

  <div class="container" id="my-profile-wording">
    <h1 id="profile-text">My Profile</h1>
  </div>
  <div class="listings-container container d-flex" id="profile" style="display:flex">
    
    <div id="left-side">
      <!-- this is 30% -->

      <div class="profilePic">
        <img :src="photo" id="photo">

        <label v-if="editing" for="photo-upload" class="editPhoto">
          Edit Photo
        </label>
        <input type="file" accept="image/png, image/jpeg" id="photo-upload" style="display:none" @change="changePhoto">
      </div>

      <button type="button" class="btn" id="edit-button" v-if="!editing"
        @click="toggleEdit()">Edit Profile</button>
      <button type="button" class="btn" id="save-button" v-if="editing"
        @click="updateData(userid)">Save Profile</button>


    </div>

    <div id="right-side">
      <h1 v-text="name" id="name"></h1>
      <div id="rating">{{ rating }}
        <font-awesome-icon icon="fa-solid fa-star" class="fa-star" />
        | {{ ratingCount }} ratings
      </div>
      <br>
      <table>
        <!-- <tr>
            <th>Name</th>
            <td>{{name}}</td>
          </tr> -->

        <tr>
          <th>Faculty</th>
          <td v-if="!editing">{{ faculty }}</td>
          <td v-if="editing"><input type="text" v-model="faculty"></td>
        </tr>
        <tr>
          <th>Major</th>
          <td v-if="!editing">{{ major }}</td>
          <td v-if="editing"><input type="text" v-model="major"></td>
        </tr>
        <tr>
          <th>Year</th>
          <td v-if="!editing">{{ year }}</td>
          <td v-if="editing"><input type="text" v-model="year"></td>
        </tr>
        <tr>
          <th>Email</th>
          <td v-if="!editing">{{ email }}</td>
          <td v-if="editing"><input type="text" v-model="email"></td>
        </tr>
        <tr>
          <th>Payment method</th>
          <td v-if="!editing && payment == ''">Unspecified</td>
          <td v-if="!editing">{{ payment }}</td>
          <td v-if="editing">
            <select v-model="payment">
              <option>PayLah</option>
              <option>PayNow</option>
              <option>Cash</option>
            </select>
          </td>

        </tr>
        <tr>
          <th>Description</th>
          <td v-if="!editing">{{ description }}</td>
          <td v-if="editing"><textarea v-model="description" id="w3review" name="w3review" rows="4"
              cols="66"></textarea></td>
        </tr>
      </table>



    </div>

  </div>
  <div class="container" id="my-profile-wording">
    <h1 id="profile-text">My Listings</h1>
  </div>

  <div class="listings-container container d-flex flex-wrap">

    <ListingComponent v-for="listing in listings" class="listing-component" :id="listing.id" :tutor="listing.user"
      :code="listing.module" :prof="listing.prof" :price="listing.price" :userID="listing.userID" :isOwn="true">
    </ListingComponent>

    <div class="add-module-container">

      <img :src="require('../assets/images/add-listing.png')"/>

      <input type="text" placeholder="Mod">

      <input type="text" placeholder="Prof">
    
      <input type="text" placeholder="Price">

      <button class="btn" id="add-listing-btn">Add listing!</button>
    </div>
  </div>

  <div class="about-shape-2">
      <img :src="require('../assets/images/about-shape-2.svg')"/>
  </div>

  <div class="about-shape-1">
      <img :src="require('../assets/images/about-shape-1.svg')"/>
  </div>


</template>

<script>
import ListingComponent from "../components/ListingComponent.vue";

import { onAuthStateChanged } from "firebase/auth"
import { query, collection, doc, where, getDocs, updateDoc } from "firebase/firestore"
import { db, auth, storage } from "../firebase/init"
import Navbar from '../components/Navbar.vue'
import { ref, getDownloadURL, listAll, deleteObject, uploadBytes } from "firebase/storage"

export default {
  data() {
    return {
      listings: [],
      userid: "",
      name: "",
      photo: "",
      rating: 0,
      ratingCount: 0,
      faculty: "",
      major: "",
      year: "",
      email: "",
      payment: "",
      description: "",
      editing: false,
      id: "",
      imgName: ""
    };
  },
  created() {


    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.getUser(user.uid);
        this.getListings(user.uid);
        console.log(user)
      } else {
        console.log("Not signed in")
      }
    })
  },
  methods: {
    async getListings(uid) {
      const querySnap = await getDocs(query(collection(db, "listings"), where("userID", "==", uid)));
      querySnap.forEach((doc) => {
        let listing = doc.data()
        listing["id"] = doc.id
        this.listings.push(listing);
      })
    },
    async getUser(uid) {
      const querySnap = await getDocs(query(collection(db, "users"),
        where("uid", "==", uid)
      ))
      querySnap.forEach((doc) => {
        this.id = doc.id
        this.userid = doc.data().uid
        this.name = doc.data().user
        this.rating = doc.data().rating
        this.ratingCount = doc.data().ratingCount
        this.faculty = doc.data().faculty
        this.major = doc.data().major
        this.year = doc.data().year
        this.email = doc.data().email
        this.payment = doc.data().payment
        this.description = doc.data().description

        var userRef = ref(storage, "users")
        listAll(userRef)
          .then((res) => {
            res.items.forEach((itemRef) => {
              const prefix = itemRef.name.split(".")[0]
              if (prefix == doc.id) {
                this.imgName = itemRef.name
                getDownloadURL(ref(storage, "users/" + itemRef.name))
                  .then((url) => {
                    this.photo = url
                  })
              }
            })
          })
      })
    },
    async updateData(uid) {
      const querySnap = await getDocs(query(collection(db, "users"),
        where("uid", "==", uid)
      ))
      const userData = {
        faculty: this.faculty,
        major: this.major,
        year: this.year,
        payment: this.payment,
        description: this.description
      }
      querySnap.forEach((d) => {
        const userRef = doc(db, "users", d.id)
        updateDoc(userRef, userData).then((res) => {
          console.log("updated")
          this.toggleEdit()
        })
      })
    },
    toggleEdit() {
      if (this.editing) {
        this.editing = false;
      }
      else {
        this.editing = true;
      }
    },
    async changePhoto(event) {
      console.log(event.target.files[0]);
      const imageRef = ref(storage, "users/" + this.imgName)
      deleteObject(imageRef).then(() => {
        const storageRef = ref(storage, "users/" + this.id)
        uploadBytes(storageRef, event.target.files[0]).then((snapshot) => {
          console.log("Image uploaded!")
          this.getUser(this.userid)
        })
      })
    }
  },
  components: { ListingComponent, Navbar },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

#profile {
  width: 80%;
  padding-bottom: 10px;
  margin-top: 0%;
  margin-bottom: 0%;
}

#left-side {
  width: 40%;
  margin-right: 2%
}

#photo {
  width: 100%;
  border-radius: 10%;
  margin-bottom: 10px;

}

#userid {
  margin-top: 20px;
}

#logo {
  width: 166px;
  height: 38px;
  margin-left: 20px
}

.desc {
  margin-top: 20px;
  margin-left: 340px;
  margin-right: 240px;
}

th {
  white-space: nowrap;
  vertical-align: top;
  text-align: left;
  font-weight: bold;
}

td {
  text-align: left;
  padding-left: 10px;
  width: fixed;
}

#name {
  font-weight: bolder;
  color: #75ACB4
}

#edit-button {
  width: 100%;
  margin-top: 10px;
  background-color: #75ACB4 !important;
  color: white;
}

#save-button{
  width: 100%;
  margin-top: 10px;
  background-color: #75ACB4 !important;
  color: white

}

#edit-button:hover {
  background-color: #1F5C64 !important;
  color: white !important;
}

#save-button:hover {
  background-color: #1F5C64 !important;
  color: white !important;
}

.profilePic {
  position: relative;
}

.profilePic .editPhoto {
  position: absolute;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);

  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  display: none;
}

.profilePic:hover .editPhoto {
  display: block;
  background-color: #1F5C64 !important;
}

#my-profile-wording{
  margin-top: 3%;
  margin-bottom: 1%
}

#profile-text{
  color: #1F5C64;
  font-weight: bold;
}

.add-module-container {
  border-radius: 5px;
  width: 18%;
  height: 45vh;
  background-color: #ececec;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: box-shadow 0.3s;
  cursor: pointer;
  margin-left: 2%;
  text-align: center;
  padding: 10px;
}

.add-module-container:hover {
  box-shadow: #5b6060 0px 2px 6px;
}

#add-listing-btn{
  width: 100%
}

#add-listing-btn:hover{
  box-shadow: #5b6060 0px 2px 6px;
}

.about-shape-2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 35%;
  height: 100%;
  z-index: -1;
}

.about-shape-2 img {
  width: 100%;
}

.about-shape-1 {
  position: absolute;
  right: 0;
  bottom: -40%;
  width: 35%;
  height: 100%;
  z-index: -1;
}

.about-shape-1 img {
  width: 100%;
  color: #1F5C64
}

.listings-container{
  margin-top: 0%;
}

#my-profile-wording{
  margin-top: 2%
}

</style>

