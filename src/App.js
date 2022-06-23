import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MentoringGrouops } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mentoring-groups" element={<MentoringGrouops />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
