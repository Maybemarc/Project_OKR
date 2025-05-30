import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const roles = ["employee", "manager", "admin"]; 

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    teamId: "",
  });
  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${API_URL}/org/teams`, {
          withCredentials: true,
        });
        console.log(res.data);
        setTeams(res.data.team);
      } catch (err) {
        toast.error("Failed to load teams");
      }
    };

    fetchTeams();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(form.teamId);
    
    try {
      const res = await axios.post(`${API_URL}/auth`, form);
      toast.success("Account created successfully 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            label="Name"
            name="name"
            fullWidth
            required
            value={form.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Email Address"
            name="email"
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            value={form.password}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Role"
            name="role"
            select
            fullWidth
            value={form.role}
            onChange={handleChange}
            margin="normal"
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Industry"
            name="teamId"
            select
            fullWidth
            value={form.teamId}
            onChange={handleChange}
            margin="normal"
          >
            {teams.map((team) => (
              <MenuItem key={team._id} value={team._id}>
                {team.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
