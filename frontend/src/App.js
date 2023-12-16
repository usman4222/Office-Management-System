import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegiserLogin from "./Pages/RegiserLogin";
import Header from "./components/Header";

function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/login" element={<RegiserLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
