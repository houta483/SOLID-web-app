import { Vue, Component } from "vue-property-decorator";
import VueMapboxComponent from "@/components/VueMapboxComponent/VueMapboxComponent.vue";

@Component({
  components: {
    VueMapboxComponent
  }
})
export default class ChoroplethLayer extends Vue {
  center: Record<string, any> = [-98, 38.88];
  zoom = 3;

  addChoropleth(map: any) {
    map.addSource("population", {
      type: "vector",
      url: "mapbox://mapbox.660ui7x6"
    });
    map.addLayer(
      {
        id: "state-population",
        source: "population",
        "source-layer": "state_county_population_2014_cen",
        maxzoom: 4,
        type: "fill",
        filter: ["==", "isState", true],
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "population"],
            0,
            "#33E6FF",
            500000,
            "#33C4FF",
            750000,
            "#33A8FF",
            1000000,
            "#3383FF",
            2500000,
            "#335EFF",
            5000000,
            "#3336FF",
            7500000,
            "#4F33FF",
            10000000,
            "#222e72",
            25000000,
            "#372272"
          ],
          "fill-opacity": 0.75
        }
      },
      "waterway-label"
    );

    map.addLayer(
      {
        id: "county-population",
        source: "population",
        "source-layer": "state_county_population_2014_cen",
        minzoom: 4,
        type: "fill",
        filter: ["==", "isCounty", true],
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "population"],
            0,
            "#33E6FF",
            100,
            "#33c9ff",
            1000,
            "#33b1ff",
            5000,
            "#339cff",
            10000,
            "#337aff",
            50000,
            "#336dff",
            100000,
            "#3363ff",
            500000,
            "#33C4FF",
            1000000,
            "#3383FF"
          ],
          "fill-opacity": 0.75
        }
      },
      "waterway-label"
    );
  }
}
