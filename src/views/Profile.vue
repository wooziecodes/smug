<template>
  <!-- <Navbar></Navbar> -->



  <div class="container" id="profile" style="display:flex">
    
    <div id="left-side">
      <!-- this is 30% -->
  
      <div class="profilePic">
        <img :src="photo" id="photo">

       <label v-if="editing" for="photo-upload" class="editPhoto" >
        Edit Photo
       </label>
       <input type="file"
       accept="image/png, image/jpeg" id="photo-upload" style="display:none" @change="changePhoto">
      </div>

      <div id="rating" class="container text-center">2.5
        <font-awesome-icon icon="fa-solid fa-star" class="fa-star" />
        | 89 ratings
      </div>
      <button type="button" class="btn" id="edit-button" style="background-color: fuchsia;" v-if="!editing"
        @click="toggleEdit()">Edit</button>
      <button type="button" class="btn" id="edit-button" style="background-color: fuchsia;" v-if="editing"
        @click="toggleEdit()">Save</button>
      <!-- ideally the button should be like the signup page but im fucking losing my shit because background-color doesnt wanna work with me but color works so i can change the color of the words-->

    </div>

    <div id="right-side">
      <h1 v-text="name" id="name"></h1>
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
          <td v-if="!editing && payment==''">Unspecified</td> 
          <td v-if="!editing">{{payment}}</td> 
          <td v-if="editing">
            <select v-model="payment">
            <option>PayLah</option>
            <option>PayNow</option>
            <option>Cash</option>
          </select></td>
          
        </tr>
        <tr>
          <th>Description</th>
          <td v-if="!editing">{{ description }}</td>
          <td v-if="editing"><textarea v-model="description" id="w3review" name="w3review" rows="8" cols="83"></textarea></td>
        </tr>
      </table>



    </div>

  </div>

  <hr>
  <!-- <div id="photo" class="container">
      <img
        src="https://randomuser.me/api/portraits/women/81.jpg"
        alt=""
        class="rounded-circle mx-auto d-block"
      />
    </div> -->

  <!-- <div id="userid" class="container text-center position-relative">
      <h1>KrazyWoman1</h1>
    </div> -->

  <!-- <div id="rating" class="container text-center">2.5 
          <font-awesome-icon icon="fa-solid fa-star" class="fa-star"/>
          | 89 ratings
      </div>


      <div>
        <table class="desc">
          <tr>
            <th colspan="2"><h1>{{name}}</h1></th>
          </tr>
          <tr>
            <th>Degree</th>
            <td>{{degree}}</td>
          </tr>
          <tr>
            <th>Major</th>
            <td>{{major}}</td>
          </tr>
          <tr>
            <th>Year</th>
            <td>{{year}}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{{email}}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit enim fugit reprehenderit neque, tenetur totam libero maiores et atque placeat minus ex ducimus, sit nisi a sint mollitia laborum optio?</td>
          </tr>
        </table>
      </div> -->
  <div class="listings-container container d-flex flex-wrap">
    <ListingComponent v-for="listing in listings" class="listing-component" :tutor="listing.user" :code="listing.module"
      :prof="listing.prof" :price="listing.price" :userID="listing.userID"></ListingComponent>
  </div>

</template>

<script>
import ListingComponent from "../components/ListingComponent.vue";
import { getDocs, query, collection } from "firebase/firestore"
import { db } from "../firebase/init"
import Navbar from './TheNavbar.vue'

export default {
  data() {
    return {
      listings: [],
      name: "Chester Chia",
      photo: "https://randomuser.me/api/portraits/women/81.jpg",
      stars: "2.5",
      rating: "89",
      faculty: "SCIS",
      major: "Business Analytics",
      year: 2,
      email: "chester@gods.com",
      payment: "",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit enim fugit reprehenderit neque, tenetur totam libero maiores et atque placeat minus ex ducimus, sit nisi a sint mollitia laborum optio?",
      editing: false
    };
  },
  created() {
    this.getListings();
  },
  methods: {
    async getListings() {
      const querySnap = await getDocs(query(collection(db, "listings")));
      querySnap.forEach((doc) => {
        this.listings.push(doc.data());
      });
    },
    toggleEdit() {
      if (this.editing) {
        this.editing = false;
      }
      else {
        this.editing = true;
      }
    },
    changePhoto(event) {
      console.log(event.target.files[0].name);
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
  margin-top: 5%;
  width: 80%;
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
  text-align: right;
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
  background-color: #1F5C64 !important;
}

#edit-button:hover {
  color: red;
}
.profilePic {
  position: relative;
}
.profilePic .editPhoto {
  position: absolute;
  top: 50%;
  left: 50%;
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
</style>

