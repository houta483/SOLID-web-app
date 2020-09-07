import L from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      zoom: 10,
      center: L.latLng(40.7608, -111.891),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      markers: [
        {
          id: "m1",
          position: [40.7608, -111.891],
          visible: true,
          text: "nknkj"
        },
        {
          id: "m2",
          position: [40.6608, -111.991],
          visible: true,
          text: "jbkjb"
        }
      ]
    };
  }
};
