<template>
  <section class="about-area pt-70">
    <div class="about-shape-2">
      <img src="../assets/images/about-shape-2.svg" alt="shape">
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-6" :class="{ 'order-lg-last': right }">
          <div
            class="about-content mt-50 wow animate__fadeIn"
            :class="[right ? 'fadeInRight' : 'fadeInLeft']"
            data-wow-duration="1s"
            data-wow-delay="0.3s"
          >
            <div class="section-title">
              <div class="line" />
              <h3 class="title">
                {{ title }}
              </h3>
            </div> <!-- section title -->
            <p class="text">
              {{ content }}
            </p>
            <a href="#" class="main-btn">Try it Free</a>
          </div> <!-- about content -->
        </div>
        <div class="col-lg-6" :class="{ 'order-lg-first': right }">
          <div
            class="about-image text-center mt-50 wow"
            :class="[right ? 'fadeInLeft' : 'fadeInRight']"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <img :src="img" :alt="title">
          </div> <!-- about image -->
        </div>
      </div> <!-- row -->
    </div> <!-- container -->
  </section>
</template>

<script>

import 'animate.css'

export default {
  props: {
    right: Boolean,
    title: {
      type: String,
      default: 'About'
    },
    img: {
      type: String,
      default: require('../assets/images/about2.svg')
    },
    content: {
      type: String,
      default: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing.'
    }
  },
  data () {
    return {}
  }
}
</script>
