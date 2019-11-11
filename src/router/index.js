import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import Dogs from "../views/Dogs.vue";
import Trustees from "../views/Trustees.vue";
import Payments from "../views/Payments.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
        {
          path: "home",
          name: "home",
          component: Home,
        },
        {
          path: "dogs",
          name: "dogs",
          component: Dogs,
        },
        {
          path: "trustees",
          name: "trustees",
          component: Trustees,
        },
        {
          path: "payments",
          name: "payments",
          component: Payments,
        },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "is-active",
  base: process.env.BASE_URL,
  routes
});

export default router;
