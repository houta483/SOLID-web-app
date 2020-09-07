import { GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "..";
import { signalsServices } from "@/common/api";
import {
  AVLGeodata,
  polygonGeoData,
  clusterGeoData
} from "@/common/tempData/geoData.js";

export interface SignalsState {
  signals: Array<any>;
  activeLayers: Array<any>;
  geoJsonData: Array<any>;
  AVLData: Array<any>;
  clustorsData: Array<any>;
}

export interface SignalsGetter {
  signals: Array<any>;
  activeLayers: Array<any>;
  geoJsonData: Array<any>;
  AVLData: Array<any>;
  clustorsData: Array<any>;
}

const initialState = (): any => {
  return {
    signals: [],
    activeLayers: ["Created Events", "AVL", "polygons", "clusters"],
    geoJsonData: [],
    AVLData: [],
    clustorsData: []
  };
};

export const state = initialState();

export const actions: ActionTree<SignalsState, RootState> = {
  async rootDeleteSignal(context, data) {
    await context.commit("deleteSignalMutation", data);
  },

  async getSignals(context) {
    const data = await signalsServices.getSignals();
    context.commit("setSignals", data.data);
  },

  async addSignal(context, data: any) {
    await signalsServices.saveSignal(data);
    context.dispatch("getSignals");
  },

  async updateSignal(context, data: object) {
    await context.commit("updateSignalMutation", data);
  },

  activeLayersAction(context, data: any) {
    context.commit("setActiveLayers", data);
  },

  getClustorsdata(context) {
    const data = clusterGeoData;
    context.commit("setCustorsData", data);
  },

  getGeoJsonLayerData(context) {
    const data = polygonGeoData;
    context.commit("setGeoJsonData", data);
  },
  getAVLData(context) {
    const data = AVLGeodata;
    context.commit("setAVLData", data);
  },
  async getMovingSignal() {
    await signalsServices.getMovingSignal();
  }
};

export const mutations: MutationTree<SignalsState> = {
  async updateSignalMutation(state: any, data: object) {
    return signalsServices.updateSignal(data);
  },

  setSignals(state, signals = []) {
    state.signals = signals;
  },

  async deleteSignalMutation(state, data) {
    const replacementState = state.signals;

    try {
      state.signals.splice(data[1], 1);
      await signalsServices.deleteSignal(data);
    } catch {
      state.signals = replacementState;
      console.log("There was an error deleting your signal");
    }
  },
  setActiveLayers(state, activeLayers = []) {
    state.activeLayers = activeLayers;
  },
  setCustorsData(state, clustors = []) {
    state.clustorsData = clustors;
  },
  setGeoJsonData(state, geoJsonData = []) {
    state.geoJsonData = geoJsonData;
  },
  setAVLData(state, AVLData = []) {
    state.AVLData = AVLData;
  }
};

export const getters: GetterTree<SignalsState, RootState> = {
  signals(state) {
    return state.signals;
  },
  activeLayers(state) {
    return state.activeLayers;
  },
  geoJsonData(state) {
    return state.geoJsonData;
  },
  AVLData(state) {
    return state.AVLData;
  },
  clustorsData(state) {
    return state.clustorsData;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
