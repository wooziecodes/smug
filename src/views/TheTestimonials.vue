<template>
  <section id="testimonial" class="testimonial-area pt-120">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div class="section-title text-center pb-40">
            <div class="line m-auto" />
            <h3 class="title">
              Users sharing<span> their experience on SMUG</span>
            </h3>
          </div> <!-- section title -->
        </div>
      </div> <!-- row -->
      <div class="row testimonial-active wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.5s">
        <div v-for="testimonial in testimonials" :key="testimonial.author" style="padding: 0 20px 0 0;">
       
          <div class="single-testimonial">
            
            <div class="testimonial-review d-flex align-items-center justify-content-between">
              <Icon icon="mdi-light:format-quote-close" height="50" />
            
            </div>
            <div class="testimonial-text">
              <p class="text">
              {{ testimonial.quote }}
              </p>
            </div>
            <div class="testimonial-author d-flex align-items-center">
              <div class="author-image">
                <img class="shape" :src="require('../assets/images/textimonial-shape.svg')"/>
                <img class="author rounded-circle" :src="testimonial.img">
                <!-- <img class="author" :src="require('../assets/images/choi.jpg')"> -->
              </div>
              <div class="author-content media-body">
                <h6 class="holder-name">
                  {{ testimonial.author }}
                </h6>
                <p class="text">
                  {{ testimonial.position }}, {{ testimonial.company }}
                </p>
              </div>
            </div>
          </div> <!-- single testimonial -->
        </div>
      </div> <!-- row -->
    </div> <!-- container -->
  </section>
</template>

<script>

require('../assets/css/style.css')
require('../assets/css/default.css')
import $ from 'jquery'
import 'slick-carousel/slick/slick.css'
import { Icon } from '@iconify/vue';
require('slick-carousel')

export default {


  data () {
    return { 
      testimonials: [{
        quote: 'Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu eirmod tempor invidunt labore.Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu.',
        author: 'Choi Juhwan',
        position: 'CEO',
        company: 'SpaceX',
        img: require('../assets/images/choi.jpg')
      }, {
        quote: 'Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu eirmod tempor invidunt labore.Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu.',
        author: 'Zachary Lim',
        position: 'UX Specialist',
        company: 'Yoast',
        img: require('../assets/images/zach.jpg')
      }, {
        quote: 'Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu eirmod tempor invidunt labore.Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu.',
        author: 'Chester Chia',
        position: 'CEO',
        company: 'Yoast',
        img: require('../assets/images/chester.jpg')
      }, {
        quote: 'Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu eirmod tempor invidunt labore.Lorem ipsum dolor sit amet,consetetur sadipscing elitr, seddiam nonu.',
        author: 'Elijah Khor',
        position: 'CEO',
        company: 'Yoast',
        img: require('../assets/images/elijah.jpg')
      }]
    }
  },

  components: {
		Icon,
	},

  mounted () {
    $('.testimonial-active').slick({
      dots: true,
      speed: 800,
      arrows: false,
      centerMode: true,
      centerPadding: '0',
      slidesToShow: 3,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            centerMode: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    })
  }
}
</script>
