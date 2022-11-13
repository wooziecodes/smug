<template>
  
  <section id="features" class="services-area pt-240">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="section-title text-center pb-40">
            <div class="line m-auto" />
            <h3 class="title" style="text-align: center">
             Your learning journey, <span> has never been easier</span>
            </h3>
          </div> <!-- section title -->
        </div>
      </div> <!-- row -->
      <div class="row justify-content-center">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="col-lg-4 col-md-7 col-sm-8"
        >
          <div class="single-services text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
            <div class="services-icon">
              <img :src="require('../assets/images/services-shape.svg')"/>


              <img class="shape" :src="require('../assets/images/services-shape.svg')"/>
              <img class="shape-1" :src="require('../assets/images/services-shape-' +(index + 1) + '.svg')"/>
            </div>
            <div class="services-content mt-30">
              <h4 class="services-title">
                <a href="#">{{ feature.name }}</a>
              </h4>
              <p class="text">
                {{ feature.content }}
              </p>
              <a class="more" href="#">Sign up now<Icon icon="ci:chevron-right" /></a>
            </div>
          </div> <!-- single services -->
        </div>
      </div> <!-- row -->
    </div> <!-- container -->
  </section>
</template>

<script>

import { Icon } from '@iconify/vue'; 

require('../assets/css/style.css')
require('../assets/css/default.css')

export default {


  components:{
    Icon
  },

  data () {
    return {
      features: [{
        icon: 'mdi-briefcase',
        name: 'Affordable Rates',
        content: 'No longer will you have to struggle to pay for personalized help!'
      }, {
        icon: 'mdi-cog-outline',
        name: 'At your own time and pace',
        content: 'Find mentors that will guide you from start to finish.'
      }, {
        icon: 'mdi-flash-outline',
        name: 'Quality',
        content: 'Mentors vetted and ready to help.'
      }]
    }
  }
} 
</script>

<style>
.single-services .services-icon {
  display: inline-block;
  position: relative;
}

.single-services .services-icon img {
  -webkit-transition: all 0.4s ease-out 0s;
  -moz-transition: all 0.4s ease-out 0s;
  -ms-transition: all 0.4s ease-out 0s;
  -o-transition: all 0.4s ease-out 0s;
  transition: all 0.4s ease-out 0s;
}

.single-services .services-icon .shape-1 {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  
}

.single-services .services-icon i {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 34px;
  color: #fff;
}

/* .single-services:hover .services-icon .shape {
  -webkit-transform: rotate(25deg);
  -moz-transform: rotate(25deg);
  -ms-transform: rotate(25deg);
  -o-transform: rotate(25deg);
  transform: rotate(25deg);
} */

.single-services .services-content .services-title a {
  font-size: 26px;
  font-weight: 700;
  color: #2E2E2E;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .single-services .services-content .services-title a {
    font-size: 24px;
  }
}

@media (max-width: 767px) {
  .single-services .services-content .services-title a {
    font-size: 20px;
  }
}

.single-services .services-content .services-title a:hover {
  color: #1F5C64;
}

.single-services .services-content .text {
  margin-top: 30px;
}

@media (max-width: 767px) {
  .single-services .services-content .text {
    margin-top: 20px;
  }
}

.single-services .services-content .more {
  margin-top: 30px;
  font-size: 16px;
  font-weight: 400;
  color: #2E2E2E;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}

.single-services .services-content .more i {
  margin-left: 10px;
}

.single-services .services-content .more:hover {
  color: #1F5C64;
}


</style>
