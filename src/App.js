import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components";
import StudentHomepage from "./pages/student/Student";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header>Applications</Header>
      <Routes>
        <Route path="/student" element={<StudentHomepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
