import { api } from "./api";

export default class SearchService {
  static search(data) {
    return api.post("/users/search", data);
  }
}
