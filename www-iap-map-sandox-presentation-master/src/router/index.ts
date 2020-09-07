import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login/Login.vue";
import User from "../views/User/User.vue";
import Services from "../views/Services/Services.vue";
import VueMapbox from "../views/VueMapbox/VueMapbox.vue";
import Leaflet from "../views/Leaflet/Leaflet.vue";
import ChoroplethLayer from "../views/ChoroplethLayer/ChoroplethLayer.vue";
import Signals from "../views/Signals/Signals.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/user",
    name: "User",
    component: User,
    children: [
      {
        path: "services",
        name: "Services",
        component: Services
      },
      {
        path: "vueMapbox",
        name: "VueMapbox",
        component: VueMapbox
      },
      {
        path: "leaflet",
        name: "Leaflet",
        component: Leaflet
      },
      {
        path: "choroplethLayer",
        name: "ChoroplethLayer",
        component: ChoroplethLayer
      },
      {
        path: "signals",
        name: "Signals",
        component: Signals
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
