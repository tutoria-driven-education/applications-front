import { api } from "./api";

export default class Applications {
  static postNewApplication(data, token) {
    return api.post(`/application/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getAllApplications(token) {
    return api.get("/application", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static updateApplicationField(data, token) {
    return api.put(`application`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
