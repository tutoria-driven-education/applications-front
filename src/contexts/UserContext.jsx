import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isMentor, setIsMentor] = useLocalStorage("isMentor", null);
  const [name, setName] = useLocalStorage("name", null);

  return (
    <UserContext.Provider value={{ isMentor, setIsMentor, name, setName }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

export { UserProvider };
