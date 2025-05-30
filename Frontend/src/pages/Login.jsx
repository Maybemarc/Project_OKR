import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { fetchUser} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      console.log(res.data);
      Cookies.set("token", res.data.token, { expires: 365 });
      await fetchUser();
      toast.success("Login successful! 🎉");
      setTimeout(() => {
        navigate("/secure/");
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(` ${msg}`);
    }
  };

  return (
    <div>
      
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
          Login to MyOKR
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            label="Email Address"
            margin="normal"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Box>
        <span>New User?</span>
        <Link to="/register" >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign Up
          </Button>
        </Link>
      </Box>
    </Container>
    </div>
  );
};

export default Login;