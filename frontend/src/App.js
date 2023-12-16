import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterLogin from "./Pages/RegisterLogin";
import Header from "./components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";

function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<RegisterLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
