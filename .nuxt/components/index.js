export { default as BackToTopButton } from '../../components/BackToTopButton.vue'
export { default as TheAbout } from '../../components/TheAbout.vue'
export { default as TheFacts } from '../../components/TheFacts.vue'
export { default as TheFeatures } from '../../components/TheFeatures.vue'
export { default as TheFooter } from '../../components/TheFooter.vue'
export { default as TheLanding } from '../../components/TheLanding.vue'
export { default as TheNavbar } from '../../components/TheNavbar.vue'
export { default as ThePosts } from '../../components/ThePosts.vue'
export { default as TheTestimonials } from '../../components/TheTestimonials.vue'

export const LazyBackToTopButton = import('../../components/BackToTopButton.vue' /* webpackChunkName: "components/back-to-top-button" */).then(c => wrapFunctional(c.default || c))
export const LazyTheAbout = import('../../components/TheAbout.vue' /* webpackChunkName: "components/the-about" */).then(c => wrapFunctional(c.default || c))
export const LazyTheFacts = import('../../components/TheFacts.vue' /* webpackChunkName: "components/the-facts" */).then(c => wrapFunctional(c.default || c))
export const LazyTheFeatures = import('../../components/TheFeatures.vue' /* webpackChunkName: "components/the-features" */).then(c => wrapFunctional(c.default || c))
export const LazyTheFooter = import('../../components/TheFooter.vue' /* webpackChunkName: "components/the-footer" */).then(c => wrapFunctional(c.default || c))
export const LazyTheLanding = import('../../components/TheLanding.vue' /* webpackChunkName: "components/the-landing" */).then(c => wrapFunctional(c.default || c))
export const LazyTheNavbar = import('../../components/TheNavbar.vue' /* webpackChunkName: "components/the-navbar" */).then(c => wrapFunctional(c.default || c))
export const LazyThePosts = import('../../components/ThePosts.vue' /* webpackChunkName: "components/the-posts" */).then(c => wrapFunctional(c.default || c))
export const LazyTheTestimonials = import('../../components/TheTestimonials.vue' /* webpackChunkName: "components/the-testimonials" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
export function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
