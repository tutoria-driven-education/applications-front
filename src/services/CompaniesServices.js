import { api } from "./api";

export default class CompaniesService {
  static getAll(token) {
    return api.get("/companies");
  }

  static changePartnership(companyId, token) {
    return api.post(
      `/companies/${companyId}/partnership/change`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  static createCompany(companyName, token) {
    return api.post(
      "/companies",
      { name: companyName },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
