import { api } from "./api";

export default class UsersService {
  static getMentoringGroups() {
    return api.get("/users/mentoring-groups");
  }
}
