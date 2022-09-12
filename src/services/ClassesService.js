import { api } from "./api";

export default class ClassesService {
  static getAll(token) {
    return api.get("/classes", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static createClass(className, token) {
    return api.post(
      "/classes",
      { name: className },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  static getLinkParameters(classId, token) {
    return api.get(`/classes/${classId}/link-parameters`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
