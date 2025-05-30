import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,

} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

    
 const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchData = async () => {
    try {
      const user = await axios.get(`${API_URL}/auth/users`, { withCredentials: true });
      setUsers(user.data.users);
    } catch {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <Container maxWidth="lg" className="users_page">
    
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user._id} >
            <Card>
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">
                  Role: {user.role || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Users;
