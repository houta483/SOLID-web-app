import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class TableComponent extends Vue {
  @Prop({ default: [], type: Array }) data!: Array<any>;

  get columns() {
    if (this.data.length == 0) {
      return [];
    }
    const cols: Array<string> = Object.keys(this.data[0]);
    cols.push("Actions");
    return cols;
  }

  editAction(row: object, index: number) {
    this.$emit("edit-action", row, index);
  }

  deleteAction(id: number, index: number) {
    this.$emit("delete-action", id, index);
  }
}
