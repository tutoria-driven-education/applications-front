import { api } from "./api";

export default class Applications {
  static postNewApplication(data) {
    return api.post("/application", data);
  }
}
