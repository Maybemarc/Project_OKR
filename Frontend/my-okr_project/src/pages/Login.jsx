import { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { fetchUser } = useAuth();
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
      await fetchUser()
      toast.success("Login successful! 🎉");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(` ${msg}`);
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
    </Container>
  );
};

export default Login;

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie"
// import toast from "react-hot-toast";

// function LoginPage(){
//   const [content, SetContent] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate()
//     const API_URL = import.meta.env.VITE_BACKEND_URL;

//   const handleChange = function (event) {
//     const { name, value } = event.target;
//     SetContent((previtems) => ({ ...previtems, [name]: value }));
//   };

//   const login = async function (e) {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         `${API_URL}/auth/login`,
//         { email: content.email, password: content.password },
//         {
//           withCredentials: true,
//         }
//       );
//       SetContent(response.data);
//       Cookies.set("token",response.data.token,{expires:365})
//       toast.success("Logged in")
//       navigate("/")
//     } catch (error) {
//       toast.error((error.response?.data?.message || "Login failed"))
//     }
//   };

//   return (
//     <div>
//       <h1>Login page</h1>

//       <form onSubmit={login}>
//         <input
//           type="text"
//           name="email"
//           onChange={handleChange}
//           value={content.email}
//         />
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           value={content.password}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// }

// export default LoginPage;
