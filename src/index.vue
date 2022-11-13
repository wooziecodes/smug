<template>
  <div>
    <TheNavbar />
    <TheLanding />
    <TheFeatures />
    <TheAbout
      v-for="about in abouts"
      :key="about.title"
      :title="about.title"
      :content="about.content"
      :img="about.img"
      :right="about.right"
    /><TheTestimonials />
    <TheFooter />
    <BackToTopButton />
  </div>
</template>

<script>
import TheNavbar from '~/components/TheNavbar'
import TheLanding from '~/components/TheLanding'
// import TheBrands from '~/components/TheBrands'
import TheFeatures from '~/components/TheFeatures'
import TheAbout from '~/components/TheAbout'
// import TheFacts from '~/components/TheFacts'
import TheTestimonials from '~/components/TheTestimonials'
import TheFooter from '~/components/TheFooter'
import BackToTopButton from '~/components/BackToTopButton'
// Animate CSS
import 'animate.css'
// Bootstrap CSS
require('../assets/css/bootstrap.min.css')
// Default CSS
require('../assets/css/default.css')
// Style CSS
require('../assets/css/style.css')

export default {
  components: {
    TheNavbar, TheLanding, TheFeatures, TheAbout, TheTestimonials, TheFooter
  },
  data () {
    return {
      abouts: [{
        title: 'Quick & Easy to setup!',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing.',
        img: require('../assets/images/about1.svg'),
        right: false
      }, {
        title: 'Get access to verified mentors!',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing.',
        img: require('../assets/images/about2.svg'),
        right: true
      }, {
        title: 'No more struggling with modules!\n',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing.',
        img: require('../assets/images/about3.svg'),
        right: false
      }]
    }
  },
  head () {
    return {
      title: 'Hello world',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Landing page'
          // name: 'description',
          // content: 'My custom description'
        }
      ]
    }
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
