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

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
    const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${API_URL}/org/departments`, {
        withCredentials: true,
      });
      console.log(res.data);
      setDepartments(res.data.department || res.data);
    } catch {
      toast.error("Failed to load departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/admin/departments/${id}`, {
        withCredentials: true,
      });
      toast.success("Department deleted");
      fetchDepartments();
    } catch {
      toast.error("Delete failed, Admin Only Access");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        🏢 Manage Departments
      </Typography>
      <Grid container spacing={3}>
        {departments.map((dept) => (
          <Grid item xs={12} sm={6} md={4} key={dept._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{dept.name}</Typography>
                <Typography variant="body2">
                  Org ID: {dept.organizationId.name}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(dept._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDepartments;
