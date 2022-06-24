import { api } from "./api";

export default class Applications {
  static postNewApplication(data, token) {
    return api.post(`/application/${token}`, data);
  }

  static getAllApplications() {
    return api.get("/application");
  }

  static updateApplicationField(id, data) {
    return api.patch(`application/${id}`, data);
  }
}
