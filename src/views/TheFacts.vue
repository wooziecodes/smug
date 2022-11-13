<template>
  <section id="facts" class="video-counter pt-70">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="video-content mt-50 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
            <img class="dots" src="~/assets/basic/assets/images/dots.svg" alt="dots">
            <div class="video-wrapper">
              <div class="video-image">
                <img :src="videoPreview" alt="video">
              </div>
              <div class="video-icon">
                <a :href="videoUrl" class="video-popup">
                  <v-icon>mdi-play</v-icon>
                </a>
              </div>
            </div> <!-- video wrapper -->
          </div> <!-- video content -->
        </div>
        <div class="col-lg-6">
          <div class="counter-wrapper mt-50 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
            <div class="counter-content">
              <div class="section-title">
                <div class="line" />
                <h3 class="title">
                  {{ title }}
                </h3>
              </div> <!-- section title -->
              <p class="text">
                {{ content }}
              </p>
            </div> <!-- counter content -->
            <div class="row no-gutters">
              <div v-for="(counter, index) in counters" :key="counter.name" class="col-4">
                <div
                  class="single-counter d-flex align-items-center justify-content-center"
                  :class="'counter-color-' + (index + 1)"
                >
                  <div class="counter-items text-center">
                    <span class="count"><span class="counter">{{ counter.count }}</span>{{ counter.unit }}</span>
                    <p class="text">
                      {{ counter.name }}
                    </p>
                  </div>
                </div> <!-- single counter -->
              </div>
            </div> <!-- row -->
          </div> <!-- counter wrapper -->
        </div>
      </div> <!-- row -->
    </div> <!-- container -->
  </section>
</template>

<script>
import $ from 'jquery'
import 'magnific-popup'
import 'magnific-popup/dist/magnific-popup.css'

export default {
  data () {
    return {
      videoPreview: require('~/assets/basic/assets/images/video.png'),
      videoUrl: 'https://www.youtube.com/watch?v=r44RKWyfcFw',
      title: 'Cool facts about this app',
      content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      counters: [{
        count: 125,
        units: 'K',
        name: 'Downloads'
      }, {
        count: 87,
        units: 'K',
        name: 'Active Users'
      }, {
        count: 4.8,
        units: '',
        name: 'User Rating'
      }],
      wp: null
    }
  },
  mounted () {
    // Video popup
    $('.video-popup').magnificPopup({
      type: 'iframe'
      // other options
    })
  }
}
</script>
