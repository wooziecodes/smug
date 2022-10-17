<template>
  <transition name="fade">
    <a
      v-if="scrolled"
      class="back-to-top"
      href="#"
    >
      <v-icon color="white">mdi-chevron-up</v-icon>
    </a>
  </transition>
</template>

<script>
import $ from 'jquery'

require('~/assets/basic/assets/css/style.css')

export default {
  data () {
    return {
      scrolled: false
    }
  },
  mounted () {
    // Sticky header
    $(window).on('scroll', () => {
      this.scrolled = $(window).scrollTop() > 600
    })
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Ref.: https://stackoverflow.com/a/60904107 */
.back-to-top i.v-icon.v-icon {
  color: white
}
</style>
