import { api } from "./api";

export default class UsersService {
  static getMentoringGroups(token) {
    return api.get("/users/mentoring-groups", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
