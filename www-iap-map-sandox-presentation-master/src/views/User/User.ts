import { Vue, Component } from "vue-property-decorator";
import PageHeader from "../../layout/PageHeader.vue";

@Component({
  components: {
    PageHeader
  }
})
export default class User extends Vue {}
