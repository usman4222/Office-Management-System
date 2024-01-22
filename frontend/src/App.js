import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegisterLogin from './Pages/RegisterLogin';
import About from './Pages/About';
import AddUser from './Pages/AddUser/AddUser';
import AllUser from './Pages/AllUsers/AllUser';
import UpdateUser from './Pages/UpdateUser/UpateUser';
import Attendance from './Pages/employeeAttendance.js/Attendance';
import UserAttendance from './Pages/employeeAttendance.js/UserAttendance';
import AttendanceDetails from './Pages/employeeAttendance.js/AttendanceDetails';
import DashBoard from './Pages/DashBoard/DashBoard';
import Finance from './Pages/Finance/Finance';
import AllExpenses from './Pages/Finance/AllExpenses';
import NotFound from './Pages/NotFound/NotFound';
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute';
import AttendanceList from './Pages/employeeAttendance.js/AttendanceList';
import UpdateUserAttendance from './Pages/employeeAttendance.js/UpdateUserAttendance';
import Logout from './Pages/Logout/Logout';
import { setAuthToken } from './actions/userAction';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('authToken');
  //   if (storedToken) {
  //     dispatch(setAuthToken(storedToken));
  //   }
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<RegisterLogin />} />
        <Route path="/about" element={<About />} />
        <Route element={<AddUser />} path="/adduser" />
        <Route element={<AllUser />} path="/allemployees" />
        <Route element={<UpdateUser />} path="/updateuser/:id" />
        <Route element={<Attendance />} path="/attendance" />
        <Route element={<UserAttendance />} path="/attendance/:id" />
        <Route element={<AttendanceDetails />} path="/attendance/view/:id" />
        <Route element={<DashBoard />} path="/dash" />
        {/* {isAuthenticated && user.role === 'admin' && (
          <> */}
            <Route element={<Finance />} path="/finance" />
            <Route element={<AllExpenses />} path="/allexpenses" />
          {/* </>
        )} */}
        <Route element={<AttendanceList />} path="/attendancelist/:id" />
        <Route element={<UpdateUserAttendance />} path="/updateattendance/:userId/:attendanceId" />
        <Route element={<Logout />} path="/logout" />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;