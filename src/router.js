import Vue from "vue";
import Router from "vue-router";
import Check from "../src/views/Check";
import CheckDate from "../src/views/CheckDate";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "check",
      component: Check
    },{
      path: "/checkDate",
      name: "checkDate",
      component: CheckDate
    }
  ]
});
