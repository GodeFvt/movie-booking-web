import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/ticket",
      name: "ticket",
      component: () => import("../views/TicketView.vue"),
    },
    {
      path: "/booking/:theaterId",
      name: "booking",
      component: () => import("../views/BookingView.vue"),
    },
    {
      path: "/theater/:movieId",
      name: "theater",
      component: () => import("../views/TheaterView.vue"),
    },
    {
      path: "/filter",
      name: "filter",
      component: () => import("../views/FilterView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
  ],
});

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }
});

export default router;
