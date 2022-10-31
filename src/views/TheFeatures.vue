<template>
  
  <section id="features" class="services-area pt-240">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="section-title text-center pb-40">
            <div class="line m-auto" />
            <h3 class="title">
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
              <a class="more" href="#">Learn More<Icon icon="ci:chevron-right" /></a>
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
        name: 'Clean',
        content: 'Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu eirmod tempor invidunt labore.'
      }, {
        icon: 'mdi-cog-outline',
        name: 'Robust',
        content: 'Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu eirmod tempor invidunt labore.'
      }, {
        icon: 'mdi-flash-outline',
        name: 'Powerful',
        content: 'Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu eirmod tempor invidunt labore.'
      }]
    }
  }
}
</script>
