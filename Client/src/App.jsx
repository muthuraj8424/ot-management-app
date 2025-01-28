import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ManageStaff from "./Admin/AddStaff";
import AddOTForm from "./Admin/AddOTForm";
import StaffList from "./Admin/StaffList";
import ManageOTs from "./Admin/ManageOTs";
import UpdateOT from "./Admin/UpdateOTs";
import OTList from "./Staff/OTlist";
import AddPatientForm from "./Staff/AddPatientForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AdminLoginForm from "./components/AdminLogin";
import StaffLoginForm from "./components/StaffLogin";
import StaffTable from "./components/StaffTable";
import RegistrationForm from "./components/Registration";


function App() {
  return (
    <Router>
      {/* <Route path="/" element={<Navbar />} /> */}
      <Navbar/>
      <Routes>
        {/* ADmin ruotes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/add-ot-form" element={<AddOTForm />} />
        <Route path="/manage-ots" element={<ManageOTs />} />
        <Route path="/add-staff" element={<ManageStaff />} />
        <Route path="/stafflist" element={<StaffList />} />
        <Route path="/update-ot/:otId" element={<UpdateOT />} />

        {/* COmponents */}
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLoginForm />} />
        <Route path="/stafflogin" element={<StaffLoginForm />} />
        <Route path="/staffTble" element={<StaffTable />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* Staff routes */}
        <Route path="/view-ots" element={<OTList />} />
        <Route
          path="patient-management/:otNumber"
          element={<AddPatientForm />}
        />

        {/* <Route path="/navbar" element={<Navbar />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
