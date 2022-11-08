<template>
  <Navbar></Navbar>
    <div id="photo" class="container">
      <img
        src="https://randomuser.me/api/portraits/women/81.jpg"
        alt=""
        class="rounded-circle mx-auto d-block"
      />
    </div>

    <div id="userid" class="container text-center position-relative">
      <h1>KrazyWoman1</h1>
    </div>

    <div id="rating" class="container text-center">2.5 
          <font-awesome-icon icon="fa-solid fa-star" class="fa-star"/>
          | 89 ratings
      </div>


      <div>
        <table class="desc">
          <tr>
            <th>Name</th>
            <td>Chester Chia</td>
          </tr>
          <tr>
            <th>Degree</th>
            <td>Bachelor of Science</td>
          </tr>
          <tr>
            <th>Major</th>
            <td>Information Systems</td>
          </tr>
          <tr>
            <th>Year of Study</th>
            <td>2</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>chester@gods.com</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit enim fugit reprehenderit neque, tenetur totam libero maiores et atque placeat minus ex ducimus, sit nisi a sint mollitia laborum optio?</td>
          </tr>
        </table>
      </div>
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
  },
  components: { ListingComponent,  Navbar },
};
</script>
<style>
* {
    margin:0;
    padding:0;
}

#photo {
    margin-top: 20px;
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
}</style>