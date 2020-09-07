import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Services extends Vue {
  cards: Array<Record<string, any>> = [
    {
      id: "vuemapbox",
      name: "VueMapbox Services",
      image: require("../../assets/img/mapbox.svg"),
      router: "VueMapbox"
    },
    {
      id: "mapboxChoroplethLayer",
      name: "Choropleth layer",
      image: require("../../assets/img/state-map.jpg"),
      router: "ChoroplethLayer"
    },
    {
      id: "leaflet",
      name: "Leaflet Map Services",
      image: require("../../assets/img/leaflet.png"),
      router: "Leaflet"
    }
  ];

  goToMap(route: string) {
    this.$router.push({ name: route });
  }
}
