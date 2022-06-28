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
import { ToastContainer } from "react-toastify";
import { IconContext } from "react-icons";
import UserContext from "./contexts/UserContext";
import MentorStudent from "./pages/mentorStudent/mentorStudent";

function App() {
  const [token, setToken] = useState("");
  const [isMentor, setIsMentor] = useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <IconContext.Provider value={{ color: "#ff7bbd", size: 16 }}>
          <AuthContext.Provider value={{ token, setToken }}>
            <UserContext.Provider value={{ isMentor, setIsMentor }}>
              <ToastContainer
                theme="dark"
                pauseOnHover={true}
                style={{ fontFamily: "Roboto Condensed", fontSize: 16 }}
              />
              <GlobalStyles />
              <Banner />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/mentoring-groups"
                  element={<MentoringGrouops />}
                />
                <Route
                  path="/partner-companies"
                  element={<PartnerCompanies />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Login />} />
                <Route path="/student" element={<StudentHomepage />} />
                <Route path="/mentor/students" element={<MentorStudent />} />
              </Routes>
            </UserContext.Provider>
          </AuthContext.Provider>
        </IconContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
