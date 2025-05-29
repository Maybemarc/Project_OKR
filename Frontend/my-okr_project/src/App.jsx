import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import CreateOKR from "./pages/CreateOKR";
import OKRs from "./pages/OKRs";
import EditOKR from "./pages/EditOKR";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Teams from "./pages/Teams";
import Departments from "./pages/Departments";
import Organizations from "./pages/Organizations"

function App() {
  return (
    <div>
      {/* <ProtectedRoute>
        <Navbar />
      </ProtectedRoute> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CreateOKR" element={<CreateOKR />} />
        <Route path="/OKRs" element={<OKRs />} />
        <Route path="/EditOkR/:id" element={<EditOKR />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/department" element={<Departments />} />
        <Route path="/organization" element={<Organizations />} />
      </Routes>
      <Toaster />
      <h2>React</h2>
    </div>
  );
}

export default App;
