import { useEffect, useState } from "react";
import {
  Container,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import OKRs from "./OKRs";
import GroupIcon from "@mui/icons-material/Group";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [okrs, setOkrs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      toast.error("Unauthorized. Please login again.");
      Cookies.remove("token");
    }
  };

  const getOKRs = async (teamId) => {
    try {
      const res = await axios.get(`${API_URL}/okrs/team/${teamId}`, {
        withCredentials: true,
      });
      setOkrs(res.data.okr);
    } catch (err) {
      toast.error("Could not fetch OKRs");
    }
  };

  useEffect(() => {
    getUserInfo().then((userData) => {
      if (userData?.teamId) {
        getOKRs(userData.teamId);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (

    <div className="dashboard_Container">
      <div className="dashboard_Box">
        <div className="dashboard_Items">
          <div className="dashboard_User_Name">
            <h2>{user.name}</h2>
          </div>
          <Link to="/secure/organization">
            <button className="dashboard_links"> Organization</button>
          </Link>
          <Link to="/secure/department">
            <button className="dashboard_links">Department</button>
          </Link>
          <Link to="/secure/teams">
            <button className="dashboard_links">
              <GroupIcon className="icons" />
              Team
            </button>
          </Link>
          <Link to="/secure/CreateOKR">
            <button className="dashboard_links">OKR</button>
          </Link>
          <Link to="/secure/userprogress">
            <button className="dashboard_links">My Okr's</button>
          </Link>
            <Link to="/secure/OKRS">
            <button className="dashboard_links">Team Okr</button>
          </Link>
          

        </div>
        <div className="dashboard_All_Content">
          <Link to="/secure/users">
            <button className="dashboard_links">Users</button>
          </Link>
          <div className="dashboard_All_Content">
            <Link to="/secure/admin">
              <button className="dashboard_links">Admin</button>
            </Link>
          </div>
          <div className="dashboard_All_Content">
            <button className="dashboard_links" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
