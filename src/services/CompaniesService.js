import { api } from "./api";

export default class CompaniesService {
  static getCompanies() {
    return api.get("/companies");
  }
}
