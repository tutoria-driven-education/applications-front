import { api } from "./api";

export default class UsersService {
  static getMentoringGroups(token) {
    return api.get("/users/mentoring-groups", {
      headers: { Authentication: `Bearer ${token}` },
    });
  }
}
