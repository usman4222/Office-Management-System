import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RegisterLogin from "./Pages/RegisterLogin";
import Header from "./components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AddUser from "./Pages/AddUser/AddUser";
import AllUser from "./Pages/AllUsers/AllUser";
import UpdateUser from "./Pages/UpdateUser/UpateUser";
import Attendance from "./Pages/employeeAttendance.js/Attendance";
import UserAttendance from "./Pages/employeeAttendance.js/UserAttendance";
import AttendanceDetails from "./Pages/employeeAttendance.js/AttendanceDetails";
import Finance from "./Pages/Finance/Finance";
import DashBoard from "./Pages/DashBoard/DashBoard";
import './index.css'
import Admin from "./Pages/Admin/Admin";
import AllExpenses from "./Pages/Finance/AllExpenses";
import NotFound from "./Pages/NotFound/NotFound";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";
import AttendanceList from "./Pages/employeeAttendance.js/AttendanceList";
import UpdateUserAttendance from "./Pages/employeeAttendance.js/UpdateUserAttendance";

function App() {

  // const { isAuthenticated } = useSelector((state) => state.user);

  // const isAuthenticate = ({ element: Element, ...rest }) => (
  //   <Route
  //     {...rest}
  //     element={(props) =>
  //       isAuthenticated ? <Element {...props} /> : <Navigate to="/login" />
  //     }
  //   />


  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<RegisterLogin />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/about" element={<About />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/allusers" element={<AllUser />} />
            <Route path="/updateuser/:id" element={<UpdateUser />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/:id" element={<UserAttendance />} />
            <Route path="/attendance/view/:id" element={<AttendanceDetails />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/dash" element={<DashBoard />} />
            <Route path="/allexpenses" element={<AllExpenses />} />
            <Route path="/attendancelist/:id" element={<AttendanceList />} />
            <Route path="/updateattendance/:id" element={<UpdateUserAttendance />} />
            <Route path="*" element={<NotFound />} />
          {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
