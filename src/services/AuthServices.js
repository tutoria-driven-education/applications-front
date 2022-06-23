import api from "./api";

export default class AuthService {
  static login(accessToken) {
    return api.post("/sessions/login",{accessToken})
  }
}


//criar contexto pra salvar 


//melhorar interface do input pra dar pra ver tudo. 