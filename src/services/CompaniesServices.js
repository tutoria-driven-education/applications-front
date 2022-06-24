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
}
