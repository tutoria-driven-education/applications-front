import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { IconContext } from "react-icons";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/MaterialUITheme";
import Banner from "./components/Banner";
import ErrorMessage from "./components/ErrorMessage";
import SharedLayout from "./components/SharedLayout";
import {
  Dashboard,
  MentoringGroups,
  PartnerCompanies,
  Login,
  StudentHomepage,
  MentorStudent,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <IconContext.Provider value={{ color: "#ff7bbd", size: 16 }}>
          <AuthProvider>
            <UserProvider>
              <ToastContainer
                theme="dark"
                pauseOnHover={true}
                style={{ fontFamily: "Roboto Condensed", fontSize: 16 }}
              />
              <GlobalStyles />
              <Banner />
              <Routes>
                <Route path="/" element={<SharedLayout />}>
                  <Route index element={<Login />} />
                  <Route path="*" element={<ErrorMessage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/student" element={<StudentHomepage />} />
                  <Route path="/mentor" element={<MentorStudent />} />
                  <Route
                    path="/mentoring-groups"
                    element={<MentoringGroups />}
                  />
                  <Route
                    path="/partner-companies"
                    element={<PartnerCompanies />}
                  />
                </Route>
              </Routes>
            </UserProvider>
          </AuthProvider>
        </IconContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
