import { useState } from "react";
import AuthContext from "./contexts/AuthContext";
import Login from "./pages/login";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Banner from "./components/Banner";
import { Dashboard, MentoringGrouops, PartnerCompanies } from "./pages";

function App() {

  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{token, setToken}}>
      <Banner />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/mentoring-groups" element={<MentoringGrouops />} />
        <Route path="/partner-companies" element={<PartnerCompanies />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
