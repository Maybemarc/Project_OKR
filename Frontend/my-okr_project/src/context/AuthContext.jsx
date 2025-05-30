import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuhtContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, { withCredentials: true });
      setUser(null);
      Cookies.remove("token");
      toast.success("Logged out");
      setTimeout(() => {
        navigate("/login")
      }, 1000);
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuhtContext.Provider value={{ user, setUser, loading, logout, fetchUser }}>
      {children}
    </AuhtContext.Provider>
  );
};

export const useAuth = () => useContext(AuhtContext);
