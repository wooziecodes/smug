<template>
  <section class="about-area pt-70">
    <div class="about-shape-2">
      <img :src="require('../assets/images/about-shape-2.svg')"/>
    </div>
    <div class="container mb-50">
      <div class="row">
        <div class="col-lg-6" :class="{ 'order-lg-last': right }">
          <div
            class="about-content mt-50 wow animate__fadeIn"
            :class="[right ? 'fadeInRight' : 'fadeInLeft']"
            data-wow-duration="1s"
            data-wow-delay="0.3s"
          >
            <div class="section-title">

              <h3 class="title">
                {{ title }}
              </h3>
            </div> <!-- section title -->
            <p class="text" id="content-text">
              {{ content }}
            </p><br>

            <!-- <a href="#" class="main-btn">Sign Up Today</a> -->
            <button class="btn" type="button" id="start-btn" style="margin-top: 8%;" v-on:click="this.$router.push({ path: '/signup' })">Get Started</button>
          </div> <!-- about content -->
        </div>
        <div class="col-lg-6" :class="{ 'order-lg-first': right }">
          <div
            id="about-image"
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
    <kinesis-container>
              <!-- Here, you can put -->
              <kinesis-element :strength="10">
                <!-- whatever -->
              </kinesis-element>
              <kinesis-element :strength="20">
                <!-- content! -->
              </kinesis-element>
          </kinesis-container>
  </section>
</template>

<script>

import 'animate.css'

import { KinesisContainer, KinesisElement} from 'vue-kinesis'




export default {
  props: {
    right: Boolean,
    title: {
      type: String,
      default: 'About'
    },
    img: {
      type: String,
      default: require('../assets/images/about1.png')
    },
    content: {
      type: String,
      default: 'SMUG is a platform for you to find experienced mentors so you that you never have to worry about finding 1-1 academic help again'
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
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

@media (max-width: 767px) {
  .about-shape-2 {
    display: none;
  }
}

#content-text{
  margin-top: 0px;
}

#about-image{
  margin-top: -30px;
}
</style>