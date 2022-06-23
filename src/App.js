import { useState } from "react";
import AuthContext from "./contexts/AuthContext";
import Login from "./pages/login";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Test from "./pages/test";

function App() {

  const [token, setToken] = useState("")

  return <>
  <BrowserRouter>
  <AuthContext.Provider value={{token, setToken}}>
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/" element={<Login />} />
    </Routes>
    </AuthContext.Provider>
  </BrowserRouter>
  </>;
}

export default App;
