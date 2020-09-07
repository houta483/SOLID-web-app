import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import {
  MglMap,
  MglMarker,
  MglPopup,
  MglNavigationControl,
  MglGeolocateControl
  // MglGeojsonLayer,
  // MglVectorLayer
} from "vue-mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import MglGeocoderControl from "vue-mapbox-geocoder";
@Component({
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglNavigationControl,
    MglGeolocateControl,
    // MglGeojsonLayer,
    // MglVectorLayer,
    MglGeocoderControl
  }
})
export default class VueMapboxComponent extends Vue {
  @Prop({ default: [], type: Array }) center!: Array<number>;
  @Prop({ default: 0, type: Number }) zoom!: number;
  @Prop({ default: [], type: Array }) pins!: any;
  @Prop({ default: "streets-v11", type: String }) mapStyle!: string;
  @Prop({ default: false, type: Boolean }) showNavigation!: boolean;
  @Prop({ default: false, type: Boolean }) showGeolocation!: boolean;
  @Prop({ default: "", type: String }) mapClass!: string;
  @Prop({ default: false, type: Boolean }) draggable!: boolean;
  @Prop({ default: "z-auto", type: String }) zIndex!: string;
  @Prop({ default: [], type: Array }) layers!: Array<any>;
  @Prop({ default: true, type: Boolean }) showMarkerLayer!: boolean;

  showMarker: boolean = this.showMarkerLayer;
  accessToken =
    "pk.eyJ1IjoiZmFyYWgtc2ZpIiwiYSI6ImNrYWg2bXN6MDAxNDIyeWp5MmI1YjllMDcifQ.JX2ltG92FqLDN6n_q-HVFw";

  created() {
    if (this.mapClass === "modalMap") {
      this.convertToAddress(this.pins[0]);
    }
  }

  get mapStyleAPI() {
    return `mapbox://styles/mapbox/${this.mapStyle}`;
  }
  @Watch("showMarkerLayer", { deep: true })
  showMarkerLayerProp(newshowMarkerLayer: boolean) {
    this.showMarker = newshowMarkerLayer;
  }

  getPinArray(pin: any) {
    if (this.mapClass !== "modalMap") {
      return [pin.Longitude, pin.Latitude];
    } else {
      return pin;
    }
  }

  rightClickEventHandler(event: Event | any) {
    this.$emit("create-event", event.mapboxEvent.lngLat.toArray());
  }
  onDragEnd(event: Event | any) {
    this.convertToAddress(event.mapboxEvent.target._lngLat.toArray());
  }

  convertToAddress(lngLat: Array<number>) {
    this.$emit("get-address", lngLat);
  }

  addSource() {
    // @ts-ignore
    const map = this.$refs.mapRef.map;
    // AVL is not selected initially
    this.layers.forEach(layer => {
      const funcName = `add-${layer}`;
      this.$emit(`${funcName}`, map);
    });

    this.$emit("get-map", map);
  }
}
