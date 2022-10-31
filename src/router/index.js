import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../views/Profile.vue'
import Landing from '../views/Landing.vue'

const routes = [
  {
    path: '/',
    component: () => import("../views/HomeView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: () => import("../views/Login.vue"),
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
  {
    path: '/landing',
    component: () => import("../views/Landing.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/feed",
    component: () => import("../views/Feed.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    component: () => import("../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//       if (to.matched.some((record) => record.meta.requiresAuth)) {
//         if (getAuth().currentUser) {
//           next();
//         } else {
//         alert("you dont have access!");
//         next("/");
//         }
//       } else {
//         next();
//       }
//     });

export default router

