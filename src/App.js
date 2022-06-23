import { BrowserRouter, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import NavMenu from "./components/navMenu";
import { MentoringGrouops } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Banner />
      <NavMenu />
      <Routes>
        <Route path="/mentoring-groups" element={<MentoringGrouops />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
