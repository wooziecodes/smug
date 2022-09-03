import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
<<<<<<< Updated upstream:smug/src/router/index.js
import Register from '../views/Register.vue'
import Secret from '../views/Secret.vue'
=======
import SignUp from '../views/SignUp.vue'
>>>>>>> Stashed changes:src/router/index.js

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
<<<<<<< Updated upstream:smug/src/router/index.js
    path: '/Login',
=======
    path: '/login',
>>>>>>> Stashed changes:src/router/index.js
    name: 'Login',
    component: Login
  },
  {
<<<<<<< Updated upstream:smug/src/router/index.js
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Secret',
    name: 'Secret',
    component: Secret
=======
    path: '/signup',
    name: 'SignUp',
    component: SignUp
>>>>>>> Stashed changes:src/router/index.js
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
