import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

const SignalModule = namespace("signals");

@Component({})
export default class MapOverlayComponent extends Vue {
  layerOptions: Array<string> = [
    "Created Events",
    "AVL",
    "polygons",
    "clusters"
  ];
  selectedLayers: Array<string> = [];

  @SignalModule.Action
  activeLayersAction!: Function;

  @SignalModule.Getter
  activeLayers!: Array<any>;

  created() {
    this.selectedLayers = this.activeLayers;
  }

  checkboxEventHandler(e: any, layer: string) {
    this.activeLayersAction(this.selectedLayers);
    this.$emit("toggle-layer", e.target.checked, layer);
  }
}
