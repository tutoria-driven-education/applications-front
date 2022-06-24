import { api } from "./api";

export default class CompaniesService {
  static getAll() {
    return api.get("/companies");
  }
}
