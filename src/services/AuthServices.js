import {api} from "./api";

export default class AuthService {
  static login(accessToken) {
    return api.post("/sessions/login",{accessToken})
  }
}