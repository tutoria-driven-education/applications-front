import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHomepage from "./pages/student/Student";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/MaterialUITheme";
import AuthContext from "./contexts/AuthContext";
import Login from "./pages/login";
import Banner from "./components/Banner";
import { Dashboard, MentoringGrouops, PartnerCompanies } from "./pages";

function App() {
  
  const [token, setToken] = useState("");
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{token, setToken}}>
          <GlobalStyles />
          <Banner />
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/mentoring-groups" element={<MentoringGrouops />} />
            <Route path="/partner-companies" element={<PartnerCompanies />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            <Route path="/student" element={<StudentHomepage />} />
          </Routes>
        </AuthContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
