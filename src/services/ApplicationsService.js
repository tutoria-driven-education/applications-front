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

  static updateApplicationField(id, data, token) {
    const body = {
      id,
      company: data.Company.name,
      job: data.Job.name,
      link: data.link,
      date: data.date,
      profile: data.profile,
      technic: data.technic,
      behavior: data.behavior,
      status: data.Status === null ? data.Status : parseInt(data.Status),
    };
    return api.put(`application/`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
