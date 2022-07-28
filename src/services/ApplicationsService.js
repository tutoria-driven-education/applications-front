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

  static deleteApplication(token, applicationId) {
    return api.delete(`/application/${applicationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getDashboard(token) {
    return api.get(`application/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
