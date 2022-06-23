import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components";
import StudentHomepage from "./pages/student/Student";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/MaterialUITheme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header>Applications</Header>
        <Routes>
          <Route path="/student" element={<StudentHomepage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
