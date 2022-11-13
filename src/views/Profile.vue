<template>
  <Navbar></Navbar>
  <div class="container" id="my-profile-wording">
    <h1 id="profile-text" class="text-center mt-4">My Profile</h1>
  </div>
  <div class="container-fluid mt-7">
    <div class="card card-profile shadow mt-4">
      <div class="row justify-content-center">
        <div class="card-profile-image mt-3">
          <div class="profilePic">
            <div class="profilepic mt-3 mb-3">
              <img class="profilepic__image" :src="photo" width="300" height="300" alt="Profibild" />
              <div v-if="editing" class="profilepic__content">
                <label for="photo-upload">
                  <span class="profilepic__icon">
                    <FontAwesomeIcon icon="fa-solid fa-camera" />
                  </span>
                  <span class="profilepic__text">Edit Photo</span>
                </label>
                <input type="file" accept="image/png, image/jpeg" id="photo-upload" style="display:none"
                  @change="changePhoto">
              </div>
            </div>
            <button type="button" class="btn" id="edit-button" v-if="!editing" @click="toggleEdit()">Edit
              Profile</button>
            <button type="button" class="btn" id="save-button" v-if="editing" @click="updateData(userid)">Save
              Profile</button>
          </div>
        </div>
      </div>
      <div class="card-body pt-0 pt-md-4">
        <div class="row justify-content-center">
          <div id="right-side">
            <h1 v-text="name" id="name" class="text-center"></h1>
            <div id="rating" class="text-center mb-2">{{ rating }}
              <font-awesome-icon icon="fa-solid fa-star" class="fa-star" />
              | {{ ratingCount }} ratings
            </div>
            <br>
            <table class="mb-3 ml-5 mr-5">
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
                <td v-if="editing"><textarea v-model="description" id="desc" name="desc"></textarea></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" id="my-profile-wording">
    <div class="d-flex justify-content-center">
      <h1 id="profile-text" class="text-center mt-4">My listings &nbsp;</h1>
      <button class="btn btn-outline-light addListingBtn" @click="toggleAdd()">
        <font-awesome-icon icon="fa-solid fa-plus" class="fa-plus" />
      </button>
    </div>
  </div>

  <div class="listings-container container d-flex flex-wrap mt-4">
    <ListingComponent v-for="listing in listings" class="listing-component query" :id="listing.id" :tutor="listing.user"
      :code="listing.module" :prof="listing.prof" :price="listing.price" :userID="listing.userID" :isOwn="true"
      @listingId="editListing">
    </ListingComponent>
  </div>

  <div v-if="adding" class="big-cont">
    <div class="listing-container add-module-container">
      <div class="container" id="add-module-input">
        <input type="file" ref="file" style="display: none" @change="loadPhoto" />
        <img :src="listingImg" style="width:100%; max-height: 119px; max-width: 104.2px; margin-bottom: 8px;"
          @click="$refs.file.click()">
        <select class="select" v-model="newMod">
          <option value="" disabled selected>Select module</option>
          <option v-for="mod of modules" :value="mod.code">{{ mod.code }}: {{ mod.name }}</option>
        </select>
        <input class="add-fields form-control" type="text" placeholder="Prof" v-model="newProf">
        <input class="add-fields form-control" type="text" placeholder="Price" v-model="newPrice">
        <button class="btn btn-outline-light" id="cancelBtn" @click="close()">Cancel</button>
        <button class="btn" id="add-listing-btn" @click="toggleAdd()">Create</button>
      </div>
    </div>
  </div>
  <div v-if="editingListing" class="big-cont">
    <div class="listing-container add-module-container">
      <div class="container" id="add-module-input">
        <input type="file" ref="file" style="display: none" @change="loadPhoto" />
        <img :src="listingImg" style="width:100%; max-height: 119px; max-width: 104.2px; margin-bottom: 8px;"
          @click="$refs.file.click()">
        <select class="select" v-model="editMod">
          <option v-for="mod of modules" :value="mod.code">{{ mod.code }}: {{ mod.name }}</option>
        </select>
        <input class="add-fields form-control" type="text" placeholder="Prof" v-model="editProf">
        <input class="add-fields form-control" type="text" placeholder="Price" v-model="editPrice">
        <button class="btn" id="cancelListingBtn" @click="closeEdit()">Cancel</button>
        <button class="btn btn-warning" id="deleteBtn" @click="deleteListing()">Delete</button>
        <button class="btn" id="editListingBtn" @click="toggleEditListing()">Confirm</button>
      </div>
    </div>
  </div>
  <div class="about-shape-2">
    <img :src="require('../assets/images/about-shape-2.svg')" />
  </div>
  <div class="about-shape-1">
    <img :src="require('../assets/images/about-shape-1.svg')" />
  </div>
</template>

<script>
import ListingComponent from "../components/ListingComponent.vue";

import { onAuthStateChanged } from "firebase/auth"
import { query, collection, doc, where, getDocs, updateDoc, addDoc, onSnapshot, deleteDoc } from "firebase/firestore"
import { db, auth, storage } from "../firebase/init"
import Navbar from '../components/Navbar.vue'
import { ref, getDownloadURL, listAll, deleteObject, uploadBytes, uploadString } from "firebase/storage"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
      imgName: "",
      adding: false,
      editingListing: false,
      listingImg: require("../assets/images/module-placeholder.png"),
      listingId: "",
      pic: null,
      newMod: "",
      newProf: "",
      newPrice: "",
      modules: [],
      editProf: "",
      editPrice: "",
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.getUser(user.uid)
        this.getListings(user.uid)
        this.loadModules()
      } 
    })
  },
  methods: {
    async loadModules() {
      const querySnap = await getDocs(query(collection(db, "module")))
      querySnap.forEach((doc) => {
        this.modules.push(doc.data())
      })
    },
    async getListings(uid) {
      const q = query(collection(db, "listings"), where("userID", "==", uid))
      onSnapshot(q, (querySnapshot) => {
        this.listings = []
        querySnapshot.forEach((doc) => {
          let listing = doc.data()
          listing["id"] = doc.id
          this.listings.push(listing);
        })
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
        this.rating = doc.data().rating.toFixed(2)
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
        updateDoc(userRef, userData).then(() => {
          alert("Updated!")
          this.toggleEdit()
        })
      })
    },
    async toggleEdit() {
      if (this.editing) {
        this.editing = false;
      }
      else {
        this.editing = true;
      }
    },
    close() {
      this.adding = false;
    },
    closeEdit() {
      this.editingListing = false;
    },
    async toggleAdd() {
      if (this.adding) {
        if (this.newPrice.includes(".")) {
          this.newPrice = parseFloat(this.newPrice)
        } else {
          this.newPrice = parseInt(this.newPrice)
        }
        const q = query(collection(db, "users"), where("uid", "==", this.userid))
        const qs = await getDocs(q)
        qs.forEach((d) => {
          const newListing = {
            module: this.newMod,
            price: this.newPrice,
            prof: this.newProf,
            user: d.data().user,
            userID: this.userid
          }

          addDoc(collection(db, "listings"), newListing).then((res) => {
            if (this.pic == null) {
              this.pic = require("../assets/images/module-placeholder.png")
              const listingsRef = ref(storage, "listings/" + res.id)
              uploadString(listingsRef, this.pic, 'data_url').then(() => {
                alert("Listing created!")
                this.adding = false;
              })
            } else {
              const listingsRef = ref(storage, "listings/" + res.id)
              uploadBytes(listingsRef, this.pic).then(() => {
                alert("Listing created!")
                this.adding = false;
              })
            }

          })
        })
      }
      else {
        this.adding = true;
      }
    },
    async changePhoto(event) {
      const imageRef = ref(storage, "users/" + this.imgName)
      deleteObject(imageRef).then(() => {
        const storageRef = ref(storage, "users/" + this.id)
        uploadBytes(storageRef, event.target.files[0]).then(() => {
          this.getUser(this.userid)
        })
      })
    },
    async deleteListing() {
      await deleteDoc(doc(db, "listings", this.listingId))
      alert("Listing deleted!")
      this.editingListing = false
    },
    toggleEditListing() {
      getDownloadURL(ref(storage, "listings/" + this.listingId)).then((url) => {
        if (url != this.listingImg) {
          const storageRef = ref(storage, "listings/" + this.listingId)
          deleteObject(storageRef).then(() => {
            uploadBytes(storageref, this.pic).then(() => {
              const listingRef = doc(db, "listings", this.listingId)
              updateDoc(listingRef, {
                module: this.editMod,
                price: this.editPrice,
                prof: this.editProf
              }).then(() => {
                alert("Updated!")
                this.editingListing = false
              })
            })
          })
        } else {
          const listingRef = doc(db, "listings", this.listingId)
          updateDoc(listingRef, {
            module: this.editMod,
            price: this.editPrice,
            prof: this.editProf
          }).then(() => {
            alert("Updated!")
            this.editingListing = false
          })
        }
      })
    },
    loadPhoto(e) {
      this.pic = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(this.pic)
      reader.onload = () => (this.listingImg = reader.result)
    },
    async editListing(e) {
      this.listingId = e
      const querySnapshot = await (getDocs(query(collection(db, "listings"))))
      querySnapshot.forEach((doc) => {
        if (doc.id == e) {
          this.editMod = doc.data().module
          this.editProf = doc.data().prof
          this.editPrice = doc.data().price
          getDownloadURL(ref(storage, "listings/" + e)).then((url) => {
            this.listingImg = url
          })
          this.editingListing = true
        }
      })
    }
  },
  components: { ListingComponent, Navbar, FontAwesomeIcon },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.big-cont {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3)
}

.select {
  width: 100%;
  margin-bottom: 8px;
}

#profile {
  width: 80%;
  padding-bottom: 10px;
  margin-top: 0%;
  margin-bottom: 0%;
}

#left-side {
  width: 40%;
  margin-right: 2%;
  position: relative;
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
  font-weight: bolder;
  font-style: italic;
  width: fixed;
  padding-right: 40px;
}

td {
  text-align: left;
  padding-left: 10px;
  width: fixed;
}

input {
  width: 100%;
}

.fa-plus {
  font-size: 2vw;
  color: #1F5C64 !important;
}

#name {
  margin-top: 30px;
  font-weight: bolder;
  color: #75ACB4
}

#edit-button {
  width: 100%;
  margin-top: 10px;
  background-color: #75ACB4 !important;
  color: white;
}

.card {
  margin-left: 40px;
  margin-right: 40px;
}

#save-button {
  width: 100%;
  margin-top: 10px;
  background-color: #75ACB4 !important;
  color: white
}

.add-module-container {
  position: fixed;
  top: 20%;
  width: 40vw;
  height: 350px;
  left: 30vw;
}

.addListingBtn {
  color: black !important;
  height: 40px;
  margin-top: 30px;
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
  text-align: center;
  margin: 0;
  top: 50%;
  transform: translateY(-50%);
}

.editPhoto {
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

#photo:hover+.editPhoto,
.editPhoto:hover {
  display: block;
  background-color: #1F5C64 !important;
}

.profilepic {
  position: relative;
  margin: auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #111;
}

.profilepic:hover .profilepic__content {
  opacity: 1;
  cursor: pointer;
}

.profilepic:hover .profilepic__image {
  opacity: .5;
  cursor: pointer;
}

.profilepic:hover .profilepic__text {
  opacity: .5;
  cursor: pointer;
}

.profilepic__image {
  object-fit: cover;
  opacity: 1;
  transition: opacity .2s ease-in-out;
}

.profilepic__content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  transition: opacity .2s ease-in-out;
}

.profilepic__icon {
  color: white;
  padding-bottom: 8px;
}

.fas {
  font-size: 20px;
}

.profilepic__text {
  text-transform: uppercase;
  font-size: 12px;
  width: 50%;
  text-align: center;
}

#my-profile-wording {
  margin-top: 3%;
  margin-bottom: 1%
}

#profile-text {
  position: sticky;
  margin-left: 40px;
  color: #1F5C64;
  font-weight: bold;
}

#cancelBtn {
  color: #1F5C64;
  width: 40%;
  border: 1px solid gray;
}

#cancelBtn:hover {
  box-shadow: #5b6060 0px 2px 6px;
}

#add-listing-btn {
  margin-left: 10%;
  width: 50%;
  background-color: #75ACB4 !important;
  color: white;
}

#add-listing-btn:hover {
  box-shadow: #5b6060 0px 2px 6px;
}

.fa-plus {
  color: white;
  width: 100%
}

#cancelListingBtn {
  color: #1F5C64;
  width: 20%;
  border: 1px solid gray;
}

#cancelListingBtn:hover {
  box-shadow: #5b6060 0px 2px 6px;
}

#editListingBtn {
  margin-left: 2%;
  width: 20%;
  background-color: #75ACB4 !important;
  color: white;
}

#editListingBtn:hover {
  box-shadow: #5b6060 0px 2px 6px;
}

#deleteBtn {
  margin-left: 2%;
  width: 20%;
  color: black;
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

#add-module-input {
  padding: 0;
  text-align: center;
  width: 90%;
  height: 55%;
  margin-top: 5%;
  margin-left: 5%;
}

.add-fields {
  margin-bottom: 8px;
}

#my-profile-wording {
  margin-top: 2%
}

#add-new {
  background-color: #75ACB4 !important;
  position: relative;
}

.plus-sign {
  position: relative;
  text-align: center;
  margin: 0;
  top: 50%;
  transform: translateY(-50%);
}

@media only screen and (max-width: 1120px) {
  #deleteBtn {
    width: 30%
  }
  #editListingBtn {
    width: 30%
  }
  #cancelListingBtn {
    width: 30%
  }
}

@media only screen and (max-width: 767px) {
  #deleteBtn {
    font-size: 2vw;
  }
  #editListingBtn {
    font-size: 2vw;

  }
  #cancelListingBtn {
    font-size: 2vw;
  }
}

@media only screen and (max-width: 615px) {
  #deleteBtn {
    width: 100%;
    margin-left: 0;
    font-size: 14px;
  }
  #editListingBtn {
    width: 100%;
    margin-left: 0;
    font-size: 14px;
  }
  #cancelListingBtn {
    width: 100%;
    font-size: 14px;
  }
  .add-module-container {
    height: 400px;
  }
}

@media only screen and (max-width: 464px) {
  .profilePic {
    height: 200px;
    width: 200px;
  }

  .profilepic {
    width: 200px;
    height: 200px;
  }

  .profilepic__image {
    height: 200px;
    width: 200px;
  }

  #name {
    margin-top: 100px;
    font-size: 30px;
  }

  th {
    font-size: 10px;
  }

  td {
    font-size: 10px;
  }

  #cancelBtn {
    width: 45%;
    font-size: 13px;
  }

  #add-listing-btn {
    width: 45%;
    font-size: 13px;
  }
}
</style>

