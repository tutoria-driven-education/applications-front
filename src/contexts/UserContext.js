// import { createContext } from "react";

// const UserContext = createContext();

// export default UserContext;

import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isMentor, setIsMentor] = useLocalStorage("isMentor", null);

  return (
    <UserContext.Provider value={{ isMentor, setIsMentor }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

export { UserProvider };
