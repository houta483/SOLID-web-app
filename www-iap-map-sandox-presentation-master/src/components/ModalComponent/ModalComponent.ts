import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ModalComponent extends Vue {
  @Prop({ default: false, type: Boolean }) showModal!: boolean;
  @Prop({ default: "Modal Title", type: String }) modalTitle!: string;

  close() {
    this.$emit("close");
  }
}
