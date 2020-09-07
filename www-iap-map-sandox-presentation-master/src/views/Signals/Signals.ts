import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import TableComponent from "../../components/TableComponent/TableComponent.vue";
import ModalComponent from "../../components/ModalComponent/ModalComponent.vue";
import SignalFormComponent from "../../components/SignalFormComponent/SignalFormComponent.vue";
import { state } from "@/store/modules/signal";

const SignalModule = namespace("signals");

@Component({
  components: {
    TableComponent,
    ModalComponent,
    SignalFormComponent
  }
})
export default class Signals extends Vue {
  showModal = false;
  isDelete = false;
  isAdd = false;

  modalTitle = "";
  signalLonLat: Array<number> = [];
  selectedSignal = {};
  deleteId = NaN;
  deleteIndex = NaN;

  editId = NaN;
  editIndex = NaN;

  DeleteSignalText = "Delete Signal?";
  EditSignalText = "Edit Signal";
  AddSignalText = "Add Signal";

  @SignalModule.Action
  getSignals!: Function;

  @SignalModule.Action
  addSignal!: Function;

  @SignalModule.Action
  updateSignal!: Function;

  @SignalModule.Action
  rootDeleteSignal!: Function;

  @SignalModule.Getter
  signals!: Array<any>;

  created() {
    this.getSignals();
  }

  enableAdd() {
    this.isAdd = true;
    this.isDelete = false;
    this.showModal = true;
  }

  // executes the add new signal
  async addNewSignal(data: object) {
    try {
      await this.addSignal(data);
      return this.initialState();
    } catch (e) {
      console.log("e", e);
    }
  }

  // tees up the edit
  editAction(data: object, index: number) {
    const lng = data["Longitude"];
    const lat: number = data["Latitude"];
    const latLng: number[] = [];

    latLng.push(Number(lng));
    latLng.push(Number(lat));

    this.signalLonLat = latLng;
    this.selectedSignal = data;

    this.isDelete = false;
    this.isAdd = false;
    this.showModal = true;

    this.editId = data["id"];
    this.editIndex = index;

    this.modalTitle = "Edit Signal";

    console.log("state.signals[index]");
    console.log(state.signals[index]);
  }

  // executes the edit
  async editSignal(data, index: number) {
    state.signals[this.editIndex]["Latitude"] = data.Latitude;
    state.signals[this.editIndex]["Longitude"] = data.Longitude;
    data.id = this.editId;
    await this.updateSignal(data);
    this.initialState();
  }

  // Tees up the delete
  deleteAction(id: number, index: number) {
    this.isDelete = true;
    this.isAdd = false;
    this.showModal = true;
    this.deleteId = id;
    this.deleteIndex = index;
  }

  // executes the delete
  async deleteSignal() {
    await this.rootDeleteSignal([this.deleteId, this.deleteIndex]);
    return this.initialState();
  }

  closeModal() {
    this.isDelete = false;
    this.isAdd = false;
    this.showModal = false;
    this.deleteId = NaN;
    // return this.initialState()
  }

  initialState() {
    this.showModal = false;
    this.isDelete = false;
    this.isAdd = false;

    this.modalTitle = "";
    this.signalLonLat = [];
    this.selectedSignal = {};
    this.deleteId = NaN;
    this.deleteIndex = NaN;
    this.DeleteSignalText = "Delete Signal?";
    this.EditSignalText = "Edit Signal";
    this.AddSignalText = "Add Signal";
  }
}
