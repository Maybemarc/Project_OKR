import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user,loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" color="default" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            MyOKR
          </Typography>
          <Button component={Link} to="/okrs" color="inherit">
            OKRs
          </Button>
          <Button component={Link} to="/create" color="inherit">
            Create OKR
          </Button>
          <Button component={Link} to="/teams" color="inherit">
            Teams
          </Button>
          <Button component={Link} to="/departments" color="inherit">
            Departments
          </Button>
          <Button component={Link} to="/organizations" color="inherit">
            Organizations
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="subtitle1">
            {user ? user.name : 
            <Link to="/login" >Login</Link>
            }
          </Typography>
          {user ? 
                  <Button onClick={handleLogout} variant="outlined" color="error">
            Logout
          </Button> : null
        }

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
