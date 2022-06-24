import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export { AuthProvider };
