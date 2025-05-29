import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import CreateOKR from "./pages/CreateOKR";
import OKRs from "./pages/OKRs";
import EditOKR from "./pages/EditOKR";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CreateOKR" element={<CreateOKR />} />
        <Route path="/OKRs" element={<OKRs />} />
        <Route path="/EditOkR/:id" element={<EditOKR />} />
      </Routes>
      <Toaster />
      <h2>React</h2>
    </div>
  );
}

export default App;
