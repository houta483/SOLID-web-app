import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/styles/index.css";
import L from "leaflet";
// import io from "socket.io-client";
// import VueSocketIO from "vue-socket.io-extended";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.config.productionTip = false;

// export const SocketInstance = io(window.location.origin, {
// 	path: '/api/socket.io',
// 	transports: ['polling'],
// });

// export const SocketInstance = io("http://localhost:9985");
// setTimeout(function() {
//   SocketInstance.emit("msgToServer", "I am setting socket from FE");
// }, 10000);

// Vue.use(VueSocketIO, SocketInstance, { store });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
