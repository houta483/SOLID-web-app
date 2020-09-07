import { Vue, Component } from "vue-property-decorator";
import VueMapboxComponent from "@/components/VueMapboxComponent/VueMapboxComponent.vue";
import ModalComponent from "@/components/ModalComponent/ModalComponent.vue";
import SignalFormComponent from "@/components/SignalFormComponent/SignalFormComponent.vue";
import MapOverlayComponent from "@/components/MapOverlayComponent/MapOverlayComponent.vue";
import { namespace } from "vuex-class";
import mapboxgl from "mapbox-gl";
// import { SocketInstance } from "@/main";
// import { ISockSubscibe } from '@libs/browserModels';

const SignalModule = namespace("signals");
@Component({
  components: {
    VueMapboxComponent,
    ModalComponent,
    SignalFormComponent,
    MapOverlayComponent
  }
})
export default class Mapbox extends Vue {
  center: Array<number> = [-111.89296852213424, 40.66636525703183]; // Murray
  // center: Array<number> = [-111.90190931166462, 40.88705750228502]; // Bountiful
  zoom = 9;
  showModal = false;
  modalTitle = "Create Signal";
  signalLonLat: Record<string, any> = {};
  map: any;
  socket: any;
  message: Array<string> = ["some msg", "another msg"];
  showMarkerLayer = true;

  icons: Array<any> = [
    {
      name: "basketball",
      url: require("../../assets/img/basketball.png")
    },
    {
      name: "butterfly",
      url: require("../../assets/img/butterfly.png")
    },
    {
      name: "cat",
      url: require("../../assets/img/cat.png")
    },
    {
      name: "football",
      url: require("../../assets/img/football.png")
    },
    {
      name: "snail",
      url: require("../../assets/img/snail.png")
    }
  ];

  @SignalModule.Action
  getSignals!: Function;

  @SignalModule.Getter
  signals!: Array<any>;

  @SignalModule.Getter
  activeLayers!: Array<any>;

  @SignalModule.Action
  getGeoJsonLayerData!: Function;

  @SignalModule.Getter
  geoJsonData!: any;

  @SignalModule.Action
  getAVLData!: Function;

  @SignalModule.Getter
  AVLData!: any;

  @SignalModule.Action
  getClustorsdata!: Function;

  @SignalModule.Getter
  clustorsData!: any;

  @SignalModule.Action
  getMovingSignal!: Function;

  async mounted() {
    // this.socket = SocketInstance;
    // this.socket.on("msgToClient", msg => {
    // this.receiveChatMessage(msg);
    // });
    await this.getSignals();
    this.getGeoJsonLayerData();
    this.getAVLData();
    this.getClustorsdata();
    console.log("signals in parent", this.signals);
  }

  sendChatMessage() {
    this.socket.emit("msgToServer", "newM");
  }

  receiveChatMessage(msg) {
    console.log("msg recieved", msg);
    this.message.push(msg);
  }

  // modal open
  createEvent(lonLat: Array<number>) {
    this.showModal = true;
    this.signalLonLat = lonLat;
  }

  closeModal() {
    this.showModal = false;
  }

  getMap(map: any) {
    this.map = map;
  }

  addClusters(map: any) {
    map.addSource("signals", {
      type: "geojson",
      data: this.clustorsData,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "signals",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6",
          100,
          "#f1f075",
          750,
          "#f28cb1"
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40]
      }
    });
    map.setLayoutProperty("clusters", "visibility", "visible");

    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "signals",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
      }
    });
    map.setLayoutProperty("cluster-count", "visibility", "visible");

    this.icons.forEach(icon => {
      map.loadImage(icon.url, function(error, image) {
        if (error) throw error;
        map.addImage(icon.name, image);
      });
    });

    map.addLayer({
      id: "unclustered-point",
      type: "symbol",
      source: "signals",
      filter: ["!", ["has", "point_count"]],
      layout: {
        "text-size": 12,
        "icon-image": ["concat", ["get", "icon"]],
        "icon-size": 0.05
      }
    });
    map.setLayoutProperty("unclustered-point", "visibility", "visible");

    // inspect a cluster on click
    map.on("click", "clusters", function(e) {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"]
      });
      const clusterId = features[0].properties.cluster_id;
      map
        .getSource("signals")
        .getClusterExpansionZoom(clusterId, function(err, zoom) {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        });
    });

    map.on("click", "unclustered-point", function(e) {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const name = e.features[0].properties.name;
      const address = e.features[0].properties.address;
      const type = e.features[0].properties.icon;

      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          "Signal Name: " +
            name +
            "<br>Type:" +
            type +
            "<br>Address: " +
            address
        )
        .addTo(map);
    });

    map.on("mouseenter", "clusters", function() {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "clusters", function() {
      map.getCanvas().style.cursor = "";
    });
  }

  addPolygons(map: any) {
    map.addSource("polygons", {
      type: "geojson",
      data: this.geoJsonData
    });
    map.addLayer({
      id: "polygons",
      type: "fill",
      source: "polygons",
      layout: {},
      paint: {
        "fill-color": "#3396FF",
        "fill-opacity": 0.5,
        "fill-outline-color": "#333FFF"
      }
    });
    map.setLayoutProperty("polygons", "visibility", "visible");
  }

  addAVL(map: any) {
    map.addSource("AVLData", {
      type: "geojson",
      data: this.AVLData
    });
    map.addLayer({
      id: "AVL",
      type: "line",
      source: "AVLData",
      paint: {
        "line-width": 4,
        "line-color": ["get", "color"]
      }
    });
    map.setLayoutProperty("AVL", "visibility", "visible");
  }

  toggleLayer(isChecked: boolean, layer: string) {
    // Need improvements
    if (layer !== "Created Events") {
      const mapLayer = this.map.getLayer(layer);

      if (typeof mapLayer !== "undefined") {
        const visibility = this.map.getLayoutProperty(layer, "visibility");
        if (visibility === "visible" && isChecked === false) {
          this.map.setLayoutProperty(layer, "visibility", "none");
          if (layer === "clusters") {
            this.map.setLayoutProperty(
              "unclustered-point",
              "visibility",
              "none"
            );
            this.map.setLayoutProperty("cluster-count", "visibility", "none");
          }
        } else {
          this.map.setLayoutProperty(layer, "visibility", "visible");
          if (layer === "clusters") {
            this.map.setLayoutProperty(
              "unclustered-point",
              "visibility",
              "visible"
            );
            this.map.setLayoutProperty(
              "cluster-count",
              "visibility",
              "visible"
            );
          }
        }
      } else {
        const nameCapitalized = layer.charAt(0).toUpperCase() + layer.slice(1);
        const funcName = `add${nameCapitalized}`;
        this[funcName](this.map);
      }
    } else {
      console.log("else", this.showMarkerLayer);
      this.showMarkerLayer = isChecked;
    }
  }
}
