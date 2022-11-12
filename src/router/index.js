import { createRouter, createWebHistory } from 'vue-router'
import Listings from '../views/Listings.vue'
import Chat from '../views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import("../views/Landing.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/signup',
    component: () => import("../views/SignUp.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: '/landing',
  //   component: () => import("../views/Landing.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  {
    path: "/feed",
    component: () => import("../views/Feed.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/listings/:query?',
    name: 'Listings',
    component: Listings
  },
  {
    path: '/chat/:id?',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/profile',
    component: () => import("../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router

