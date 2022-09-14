import { api } from "./api";

export default class SearchService {
   static search(data, token) {
    return api.post("/users/search", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
