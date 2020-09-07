import { Vue, Component, Prop } from "vue-property-decorator";
import VueMapboxComponent from "@/components/VueMapboxComponent/VueMapboxComponent.vue";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MglGeocoderControl from "vue-mapbox-geocoder";
import Axios from "axios";
import { namespace } from "vuex-class";

const SignalModule = namespace("signals");

@Component({
  components: {
    VueMapboxComponent,
    MglGeocoderControl
  }
})
export default class SignalFormComponent extends Vue {
  @Prop({ default: {}, type: Array }) signalLonLat!: Array<number>;
  @Prop({ default: 0, type: Number }) zoom!: number;
  @Prop({ default: 0, type: Number }) signalToEditIDProp!: number;
  @Prop({ default: 0, type: Number }) signalToEditIndexProp!: number;
  @Prop({ default: () => ({ Name: "", TypeID: "" }), type: Object })
  signal!: Record<string, any>;

  @SignalModule.Action
  updateSignal!: Function;

  @SignalModule.Action
  rootDeleteSignal!: Function;

  signalObject: Record<string, any> = {};
  address = "";
  zipcode = 0;
  finalLonLat: Array<number> = [];
  accessToken =
    "pk.eyJ1IjoiZmFyYWgtc2ZpIiwiYSI6ImNrYWg2bXN6MDAxNDIyeWp5MmI1YjllMDcifQ.JX2ltG92FqLDN6n_q-HVFw";
  zIndex = "";
  geocoder: any;
  center: Array<number> = [];

  created() {
    this.center = this.signalLonLat;
    console.log("what is center", this.center);
    this.finalLonLat = this.signalLonLat;
    this.signalObject = this.signal;
  }

  mounted() {
    const geocoder = new MapboxGeocoder({
      accessToken: this.accessToken,
      countries: "us"
    });
    geocoder.addTo("#geocoder");
    geocoder.on("result", (e: any) => {
      this.center = e.result.center;
      this.finalLonLat = e.result.center;
      this.address = e.result.place_name;
      this.zipcode = parseInt(e.result.place_name.match(/\b\d{5}\b/g)[0]);
    });
    this.geocoder = geocoder;
  }

  async getAddress(lngLat: Array<number>) {
    this.finalLonLat = lngLat;
    const api = await Axios.get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        lngLat[0] +
        "," +
        lngLat[1] +
        ".json?access_token=pk.eyJ1IjoiZmFyYWgtc2ZpIiwiYSI6ImNrYWg2bXN6MDAxNDIyeWp5MmI1YjllMDcifQ.JX2ltG92FqLDN6n_q-HVFw"
    );
    const address = api.data.features[0].place_name;
    this.address = address;
    this.zipcode = parseInt(api.data.features[0].context[1].text);
    this.geocoder.setInput(this.address);
  }

  close() {
    this.$emit("close");
    console.log(this.signalToEditIDProp);
    console.log(this.signalToEditIndexProp);
  }

  async save() {
    console.log(this.finalLonLat);

    if (!this.isDisabled) {
      const data = {
        Longitude: this.finalLonLat[0],
        Latitude: this.finalLonLat[1],

        Name: this.signalObject.Name,
        // SignalType: this.signalObject.TypeID,

        Address: this.address,
        PostalCode: this.zipcode
      };

      try {
        this.$emit("saveSignal", data);
        this.close();
      } catch (e) {
        console.log("e", e);
      }
    }
  }

  get isDisabled() {
    if (
      !this.signalObject.Name ||
      // !this.signalObject.TypeID ||
      !this.finalLonLat
    ) {
      return true;
    } else {
      return false;
    }
  }
}
