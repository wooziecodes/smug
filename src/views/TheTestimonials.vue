<template>
  <section id="testimonial" class="testimonial-area pt-120">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div class="section-title text-center pb-40">
            <div class="line m-auto" />
            <h3 class="title" style="text-align: center">
              What users are saying
            </h3>
            
          </div> <!-- section title -->
        </div>
      </div> <!-- row -->
      <div class="testimonial-active">
        <div v-for="testimonial in testimonials" :key="testimonial.author" style="padding: 0 20px 0 0;">
       
          <div class="single-testimonial">
            
            <div class="testimonial-review d-flex align-items-center justify-content-between">
            
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
            
              </div>
              <div class="author-content media-body">
                <h6 class="holder-name">
                  {{ testimonial.author }}
                </h6>  
             
              </div>
            </div>
          </div> 
        </div>
      </div>
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
        quote: 'I was looking for 1-1 help but was afraid to reach out to my TAs, SMUG helps me with this problem.',
        author: 'Choi Juhwan',
        img: require('../assets/images/choi.jpg')
      }, {
        quote: 'SMUG has been a huge help in my academic journey, I can now find mentors to help me through difficult mods',
        author: 'Zachary Lim',
    
        img: require('../assets/images/zach.jpg')
      }, {
        quote: 'The personalized help I found through SMUG allows me to find help at my own pace and excel at classes.',
        author: 'Chester Chia',

        img: require('../assets/images/chester.jpg')
      }, {
        quote: 'Not have I gained a tutor, i have also gained a mentor in my academic life. More tect mores',
        author: 'Elijah Khor',
   
        img: require('../assets/images/elijah.jpg')
      }]
    }
  },

  components: {
	
	},

  mounted () {
    $('.testimonial-active').slick({
      dots: true,
      speed: 80,
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

<style>
.section-title .line {
  background: -webkit-linear-gradient(#1F5C64 0%, #1F5C64 100%);
  background: -o-linear-gradient(#1F5C64 0%, #1F5C64 100%);
  background: linear-gradient(#1F5C64 0%, #1F5C64 100%);
  width: 150px;
  height: 5px;
  margin-bottom: 10px !important;
}

.section-title .title {
  font-size: 38px;
  font-weight: 700;
  line-height: 42px;
}

@media (max-width: 767px) {
  .section-title .title {
    font-size: 20px;
  }
}

@media only screen and (min-width: 576px) and (max-width: 767px) {
  .section-title .title {
    font-size: 30px;
  }
}

.section-title .title span {
  font-weight: 400;
  display: contents;
}

/*===== All Section Title Style =====*/
.section-title .sub-title {
  font-size: 18px;
  font-weight: 400;
  color: #1F5C64;
  text-transform: uppercase;
}

@media (max-width: 767px) {
  .section-title .sub-title {
    font-size: 16px;
  }
}

.section-title .title {
  font-size: 32px;
  padding-top: 10px;
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .section-title .title {
    font-size: 30px;
  }
}

@media (max-width: 767px) {
  .section-title .title {
    font-size: 24px;
  }
}

.section-title .title span {
  font-weight: 400;
  display: contents;
}

/*===========================
     08.TESTIMONIAL css
===========================*/
.single-testimonial {
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 30px 0px rgba(167, 167, 167, 0.16);
  -moz-box-shadow: 0px 0px 30px 0px rgba(167, 167, 167, 0.16);
  box-shadow: 0px 0px 30px 0px rgba(167, 167, 167, 0.16);
  overflow: hidden;
  border-radius: 10px;
  padding: 25px 30px 5px;
  border-radius: 10px;
  border: 2px solid transparent;
  margin: 30px 0;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}

@media (max-width: 767px) {
  .single-testimonial {
    padding: 20px 20px 5px;
  }
}

.single-testimonial .testimonial-review .quota i {
  font-size: 36px;
  color: #119BD2;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}

.single-testimonial .testimonial-review .star ul li {
  display: inline-block;
  font-size: 16px;
  color: #1F5C64;
}

.single-testimonial .testimonial-text {
  margin-top: 25px;
}

.single-testimonial .testimonial-author {
  margin-top: 30px;
}

.single-testimonial .testimonial-author .author-image {
  position: relative;
}

.single-testimonial .testimonial-author .author-image .author {
  position: absolute;
  top: 17px;
  left: 17px;
  width: 80px;
  height: 80px;
}

.single-testimonial .testimonial-author .author-content .holder-name {
  font-size: 18px;
  font-weight: 700;
  color: #2E2E2E;
}

.single-testimonial .testimonial-author .author-content .text {
  font-size: 15px;
}

.single-testimonial:hover {
  border-color: #1F5C64;
}

.single-testimonial:hover .testimonial-review .quota i {
  color: #1F5C64;
}

.slick-center .single-testimonial {
  border-color: #1F5C64;
}

.slick-center .single-testimonial .testimonial-review .quota i {
  color: #1F5C64;
}

.testimonial-active .slick-dots {
  margin-left: 45%;
}

.testimonial-active .slick-dots li {
  display: inline-block;
  margin: 0 4px;
}

.testimonial-active .slick-dots li button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(180deg, #1F5C64 0%, #1F5C64 100%);
  border: 0;
  font-size: 0;
  opacity: 0.5;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}

.testimonial-active .slick-dots li.slick-active button {
  opacity: 1;
  width: 15px;
  height: 15px;
}



</style>
