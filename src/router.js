import Vue from "vue";
import Router from "vue-router";
import Check from "../src/views/Check";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "check",
      component: Check
    },
  ]
});
