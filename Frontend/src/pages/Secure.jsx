import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "./Dashboard";
import CreateOKR from "./CreateOKR";
import OKRs from "./OKRs";
import EditOKR from "./EditOKR";
import Teams from "./Teams";
import Departments from "./Departments";
import Organizations from "./Organizations";
import Notfound from "./Notfound";
import SecureNavbar from "../components/SecureNavbar";
import Users from "./Users";
import AdminDashboard from "./AdminDashboard";
import AdminUsers from "./AdminUsers";
import AdminDepartments from "./AdminDepartments";
import AdminTeams from "./AdminTeams";
import UserProgress from "./UserProgress";

function SecurePages() {
  return (
    <ProtectedRoute>
      <div className="secure_layout">
        <Dashboard />
        <div className="main_content_area">
          <SecureNavbar />
          <Routes>
            <Route path="/" element={<OKRs />} />
            <Route path="/CreateOKR" element={<CreateOKR />} />
            <Route path="/OKRs" element={<OKRs />} />
            <Route path="/EditOkR/:id" element={<EditOKR />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/department" element={<Departments />} />
            <Route path="/organization" element={<Organizations />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userprogress" element={<UserProgress/>} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/departments" element={<AdminDepartments />} />
            <Route path="/admin/teams" element={<AdminTeams />} />
            <Route path="/*" element={<Notfound />} />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default SecurePages;
