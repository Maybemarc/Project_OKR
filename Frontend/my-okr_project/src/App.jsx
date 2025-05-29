import { Route, Routes } from "react-router-dom";
import {Toaster } from "react-hot-toast"
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import SignUpPage from "./components/SignUp";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
      <h2>React</h2>
    </div>
  );
}

export default App;
