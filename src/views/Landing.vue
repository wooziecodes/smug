<template>
  <Navbar></Navbar>
  <header class="header-area">
    <div id="home" class="header-hero bg_cover">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="header-hero-content text-center">
              <kinesis-container>
                <kinesis-element :strength="50">

                  <h3 class="header-sub-title" style="color:black">
                Supercharge your
                Learning
              </h3>         
            </kinesis-element>


              </kinesis-container>
            
            
              <font-awesome-icon icon="fa-thin fa-user" />
             

              <!-- <transition name="fade"> 
    <h2  v-if="scrolled" class="header-title animate__fadeIn" data-wow-duration="1.3s" data-wow-delay="0.5s" style="color:black">
               Find your next
                mentor today
              </h2>
   
  </transition> -->


  <h2  v-auto-animate class="header-title animate__fadeIn" data-wow-duration="1.3s" data-wow-delay="0.5s" style="color:black">
               Find your next
                mentor today
              </h2>
<!-- <button @click="show = !show">Toggle</button> -->
<!-- <Transition>
  <p v-if="show">hello</p>
</Transition>

   -->
          
              <p class="animate__fadeInUp" data-wow-duration="4.3s" data-wow-delay="0.8s" style="color:black">
                Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              </p>
              
              <button class="main-btn animate__fadeIn" data-wow-duration="1.3s" data-wow-delay="1.1s" v-on:click="this.$router.push('/login')">Get Started</button>
              <!-- <v-btn to="/newpage">Next Page</v-btn> -->

            </div> <!-- header hero content -->
          </div>
        </div> <!-- row -->
        <div class="row-mt-6">
          <div class="col-lg-12">
            <div class="header-hero-image text-center animate__fadeIn" data-wow-duration="1.3s" data-wow-delay="1.4s">
          
              <img :src="require('../assets/images/hero1.png')"/>
            </div> <!-- header hero image -->
          </div>
        </div> <!-- row -->
      </div> <!-- container -->

    </div> <!-- header hero -->
  </header>

  <TheAbout></TheAbout>
  <Features></Features>
  <Testimonials></Testimonials>
  <Footer></Footer>



</template>

<script>
import TheAbout from './TheAbout.vue'
import Navbar from './TheNavbar.vue'
import Login from './Login.vue'
import Features from './TheFeatures.vue'
import Footer from './TheFooter.vue'
import Testimonials from './TheTestimonials.vue'
import BackToTopButton from './BackToTopButton.vue'
import { Icon } from '@iconify/vue';
import { KinesisContainer, KinesisElement} from 'vue-kinesis'


require('../assets/css/style.css')
require('../assets/css/default.css')
export default{


  components:{
    Navbar, TheAbout, Login, Features, Footer, Testimonials,Icon, BackToTopButton
  },

  data(){
    return {scrolled: false}
    
   
  },

  mounted () {
    // Sticky header
    $(window).on('scroll', () => {
      this.scrolled = $(window).scrollTop() > 600
    })
  },



  methods:{

    gotoLogin(){
      this.$router.push('/Login.vue'); 
    }



  }
,
  props:{
    img: {
      type: String,
      default: require('../assets/images/hero1.png')
    }

  }



}


</script>

<style scoped>
.bg_cover {
  background-image: url('../assets/images/banner-bg.svg');
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
