<template>
  <Navbar></Navbar>
  <header class="header-area">
    <div id="home" class="header-hero bg_cover">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="header-hero-content text-center">
              <h3 class="animate__animated animate__bounce header-sub-title wow fadeInUp" style="color:black" data-wow-duration="1.3s" data-wow-delay="0.2s">
                Supercharge your
                Learning
              </h3>
              <h2 class="header-title animate__fadeIn" data-wow-duration="1.3s" data-wow-delay="0.5s" style="color:black">
               Find your next
                mentor today
              </h2>

              <h2 class="animate__fadeInUp">
                TestTEST
              </h2>
          
              <p class="animate__fadeInUp" data-wow-duration="4.3s" data-wow-delay="0.8s" style="color:black">
                Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              </p>
              <a href="#" class="main-btn animate__fadeIn" data-wow-duration="1.3s" data-wow-delay="1.1s">Get Started</a>
            </div> <!-- header hero content -->
          </div>
        </div> <!-- row -->
        <div class="row-mt-6">
          <div class="col-lg-12">
            <div class="header-hero-image text-center animate__fadeIn" data-wow-duration="1.3s" data-wow-delay="1.4s">
              <img src="../assets/images/hero1.png" alt="hero">
            </div> <!-- header hero image -->
          </div>
        </div> <!-- row -->
      </div> <!-- container -->

    </div> <!-- header hero -->
  </header>

  <TheAbout></TheAbout>

</template>

<script>
import TheAbout from './TheAbout.vue'
import Navbar from './TheNavbar.vue'

require('../assets/css/style.css')
export default{

  components:{
    Navbar, TheAbout
  }

}


</script>

<style scoped>
.bg_cover {
  background-image: url('../assets/images/banner-bg.svg');
}
</style>
