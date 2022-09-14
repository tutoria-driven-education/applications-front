import { api } from "./api";

export default class AuthService {
  static login(accessToken) {
    return api.post("/sessions/login", { accessToken });
  }

  static authWithGoogle(body) {
    return api.post("/auth/google", body);
  }
}
