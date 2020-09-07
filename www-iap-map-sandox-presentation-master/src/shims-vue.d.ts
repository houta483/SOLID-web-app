declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "mapbox-gl";
declare module "vue-mapbox";
declare module "leaflet";
declare module "vue-mapbox-geocoder";
declare module "@mapbox/mapbox-gl-geocoder";
declare module "vue2-leaflet" {
  import * as L from "leaflet";
  export { L };
}
