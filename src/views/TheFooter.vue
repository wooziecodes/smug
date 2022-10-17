<template>
  <footer id="footer" class="footer-area bg_cover pt-120">
    <div class="container">
      <div class="subscribe-area wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
        <div class="row">
          <div class="col-lg-6">
            <div class="subscribe-content mt-45">
              <h2 class="subscribe-title">
                Subscribe Our Newsletter <span>get reguler updates</span>
              </h2>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="subscribe-form mt-50">
              <form action="#">
                <input type="text" placeholder="Enter email">
                <button class="main-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div> <!-- row -->
      </div> <!-- subscribe area -->
      <div class="footer-widget pb-100">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8">
            <div class="footer-about mt-50 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
              <a class="logo" href="#">
                <img src="~/assets/basic/assets/images/logo.svg" alt="logo">
              </a>
              <p class="text">
                Lorem ipsum dolor sit amet consetetur sadipscing elitr, sederfs diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
              </p>
              <ul class="social">
                <li><a href="#"><v-icon>mdi-facebook</v-icon></a></li>
                <li><a href="#"><v-icon>mdi-twitter</v-icon></a></li>
                <li><a href="#"><v-icon>mdi-instagram</v-icon></a></li>
                <li><a href="#"><v-icon>mdi-linkedin</v-icon></a></li>
              </ul>
            </div> <!-- footer about -->
          </div>
          <div class="col-lg-5 col-md-7 col-sm-7">
            <div class="footer-link d-flex mt-50 justify-content-md-between">
              <div class="link-wrapper wow fadeIn" data-wow-duration="1s" data-wow-delay="0.4s">
                <div class="footer-title">
                  <h4 class="title">
                    Quick Link
                  </h4>
                </div>
                <ul class="link">
                  <li><a href="#">Road Map</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Refund Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Pricing</a></li>
                </ul>
              </div> <!-- footer wrapper -->
              <div class="link-wrapper wow fadeIn" data-wow-duration="1s" data-wow-delay="0.6s">
                <div class="footer-title">
                  <h4 class="title">
                    Resources
                  </h4>
                </div>
                <ul class="link">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Page</a></li>
                  <li><a href="#">Portfolio</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div> <!-- footer wrapper -->
            </div> <!-- footer link -->
          </div>
          <div class="col-lg-3 col-md-5 col-sm-5">
            <div class="footer-contact mt-50 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
              <div class="footer-title">
                <h4 class="title">
                  Contact Us
                </h4>
              </div>
              <ul class="contact">
                <li>+809272561823</li>
                <li>info@gmail.com</li>
                <li>www.yourweb.com</li>
                <li>123 Stree New York City , United <br> States Of America 750.</li>
              </ul>
            </div> <!-- footer contact -->
          </div>
        </div> <!-- row -->
      </div> <!-- footer widget -->
      <div class="footer-copyright">
        <div class="row">
          <div class="col-lg-12">
            <div class="copyright copyright-content d-sm-flex justify-content-between">
              <p class="text" style=" width: 100%; text-align: center">
                © {{ new Date().getFullYear() }} — <strong>Romain Fouilland</strong> - <a href="mailto:romain@fouilland.fr">Contact</a>
              </p>
            </div> <!-- copyright -->
          </div>
        </div> <!-- row -->
      </div> <!-- footer copyright -->
    </div> <!-- container -->
    <Particles
      id="particles-2"
      class="particles"
      url="particles.json"
    />
  </footer>
</template>

<script>
import Particles from 'particles.vue'
import Vue from 'vue'
Vue.use(Particles)

export default {}
</script>

<style scoped>
.bg_cover {
  background-image: url('~assets/basic/assets/images/footer-bg.svg');
}
</style>
