import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  BackToTopButton: () => import('../../components/BackToTopButton.vue' /* webpackChunkName: "components/back-to-top-button" */).then(c => wrapFunctional(c.default || c)),
  TheAbout: () => import('../../components/TheAbout.vue' /* webpackChunkName: "components/the-about" */).then(c => wrapFunctional(c.default || c)),
  TheFacts: () => import('../../components/TheFacts.vue' /* webpackChunkName: "components/the-facts" */).then(c => wrapFunctional(c.default || c)),
  TheFeatures: () => import('../../components/TheFeatures.vue' /* webpackChunkName: "components/the-features" */).then(c => wrapFunctional(c.default || c)),
  TheFooter: () => import('../../components/TheFooter.vue' /* webpackChunkName: "components/the-footer" */).then(c => wrapFunctional(c.default || c)),
  TheLanding: () => import('../../components/TheLanding.vue' /* webpackChunkName: "components/the-landing" */).then(c => wrapFunctional(c.default || c)),
  TheNavbar: () => import('../../components/TheNavbar.vue' /* webpackChunkName: "components/the-navbar" */).then(c => wrapFunctional(c.default || c)),
  ThePosts: () => import('../../components/ThePosts.vue' /* webpackChunkName: "components/the-posts" */).then(c => wrapFunctional(c.default || c)),
  TheTestimonials: () => import('../../components/TheTestimonials.vue' /* webpackChunkName: "components/the-testimonials" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
