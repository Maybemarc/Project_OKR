import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

    const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/users`, { withCredentials: true });
      setUsers(res.data.users);
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`, { withCredentials: true });
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Delete failed, Admin only Access");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        👥 Manage Users
      </Typography>
      <Grid container spacing={3}>
        {users.map((u) => (
          <Grid item xs={12} sm={6} md={4} key={u._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{u.name}</Typography>
                <Typography variant="body2">{u.email}</Typography>
                <Typography variant="caption">Role: {u.role}</Typography>

                {user?._id !== u._id && (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(u._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminUsers;
