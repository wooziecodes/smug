<template>
  <transition name="fade">
    <a
      v-if="scrolled"
      class="back-to-top"
      href="#"
    >
    <Icon icon="ci:chevron-up" />

    </a>
  </transition>
</template>

<script>
import $ from 'jquery'
import { Icon } from '@iconify/vue';
import BackToTop from 'vue-backtotop'


require('../assets/css/style.css')

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
  },
  components: {
		Icon,BackToTop 
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
<!-- 
<template>
<div id="app" v-cloak>
  <div class="h-screen bg-blue-200"></div>
  <div class="h-screen bg-blue-300"></div>
  <div class="h-screen bg-blue-400"></div>
  <div class="h-screen bg-blue-500"></div>
  <div class="h-screen bg-blue-600"></div>
  <transition name="fade">
    <div id="pagetop" class="fixed right-0 bottom-0" v-show="scY > 300" @click="toTop">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
           stroke="#4a5568"
           stroke-width="1" stroke-linecap="square" stroke-linejoin="arcs">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </div>
  </transition>
</div> 
</template>
<script>
const app = new Vue({
  el: '#app',
  data() {
    return {
      scTimer: 0,
      scY: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  },
});
</script> -->
