import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class PageHeader extends Vue {
  isOpen = false;
  NavLinks: Array<Record<string, any>> = [
    {
      id: "vuemapbox",
      name: "Vue Mapbox",
      router: "VueMapbox"
    },
    {
      id: "ChoroplethLayer",
      name: "Choropleth layer",
      router: "ChoroplethLayer"
    },
    {
      id: "leaflet",
      name: "Leaflet Map",
      router: "Leaflet"
    },
    {
      id: "signals",
      name: "Signals",
      router: "Signals"
    },
    {
      id: "Logout",
      name: "Logout",
      router: "Login"
    }
  ];

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
  navigateTo(route: string) {
    this.$router.push({ name: route });
    this.toggleMenu();
  }
}
