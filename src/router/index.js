import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Feed from '../views/Feed.vue'

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     { path: "/", component: () => import("../views/HomeView.vue") },
//     { path: "/login", component: () => import("../views/Login.vue") },
//     { path: "/signup", component: () => import("../views/SignUp.vue") },
//   ]
// });
// export default router;

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: "/feed",
    component: () => import("../views/Feed.vue"),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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