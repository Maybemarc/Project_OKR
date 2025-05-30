import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import Notfound from "./pages/Notfound";
import SecurePages from "./pages/Secure";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RedirectRoute from "./components/Redirect";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RedirectRoute>
              <HomePage />
            </RedirectRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectRoute>
              <RegisterPage />
            </RedirectRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectRoute>
              <Login />
            </RedirectRoute>
          }
        />
        <Route path="/secure/*" element={<SecurePages />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
