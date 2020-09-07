import Vue from "vue";
import Vuex from "vuex";

import signals, { SignalsState, SignalsGetter } from "./modules/signal";
Vue.use(Vuex);

export interface RootState {
  signals: SignalsState;
}

export type RootGetters = SignalsGetter;

export default new Vuex.Store({
  modules: {
    signals
  }
});
