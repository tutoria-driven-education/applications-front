import { BrowserRouter, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import NavMenu from "./components/navMenu";
import { MentoringGrouops, PartnerCompanies } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Banner />
      <NavMenu />
      <Routes>
        <Route path="/mentoring-groups" element={<MentoringGrouops />}></Route>
        <Route path="/partner-companies" element={<PartnerCompanies />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
