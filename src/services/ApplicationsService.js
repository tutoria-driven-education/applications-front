import { api } from "./api";

const makeQueryParams = (consultation) => {
  const keys = Object.keys(consultation)
  let newConsultation = ''
  keys.map(key => {
    if (consultation[key]) newConsultation += `${key}=${consultation[key]}&`
  })
  return newConsultation
}
export default class Applications {

  static searchApplications(token, filters) {
    console.log({ filters })
    const newFilters = makeQueryParams(filters)
    return api.get(`application/search?${newFilters}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

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
