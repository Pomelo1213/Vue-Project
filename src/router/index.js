import Vue from "vue";
import Router from "vue-router";
import Goods from "../components/Goods";
import Ratings from "../components/Ratings";
import Saler from "../components/Saler";

Vue.use(Router);

const routes = [
  {
    // 配置默认路由
    path: "/",
    redirect: "/goods"
  },
  {
    path: "/goods",
    component: Goods
  },
  {
    path: "/ratings",
    component: Ratings
  },
  {
    path: "/saler",
    component: Saler
  }
];

export default new Router({
  routes,
  linkActiveClass: "link-active"
});
