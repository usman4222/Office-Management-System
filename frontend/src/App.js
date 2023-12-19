import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterLogin from "./Pages/RegisterLogin";
import Header from "./components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AddUser from "./Pages/AddUser/AddUser";
import AllUser from "./Pages/AllUsers/AllUser";
import UpdateUser from "./Pages/UpdateUser/UpateUser";

function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<RegisterLogin />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/allusers" element={<AllUser />} />
        <Route path="/updateuser/:id" element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
