import Axios, { AxiosPromise } from "axios";

// Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export const signalsServices = {
  saveSignal(data: any): AxiosPromise<any> {
    return Axios.post("http://localhost:9985/signals/", data);
  },

  getSignals(): AxiosPromise<any> {
    return Axios.get("http://localhost:9985/signals/");
  },

  updateSignal(data: any): AxiosPromise<any> {
    const id = data["id"];
    delete data["id"];
    return Axios.put(`http://localhost:9985/signals/${id}`, data);
  },

  deleteSignal(data: any): AxiosPromise<any> {
    const id = data[0];
    delete data[0];
    return Axios.delete(`http://localhost:9985/signals/${id}`, data);
  },

  getMovingSignal(): AxiosPromise<any> {
    return Axios.get("http://localhost:9985/signals/movingPoints");
  }
};
