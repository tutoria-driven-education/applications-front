import { api } from "./api";

export default class SearchService {
  static search(data) {
    console.log(data);
    return api.post("/users/search", data);
  }
}
