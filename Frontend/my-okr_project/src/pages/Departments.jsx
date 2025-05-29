import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [form, setForm] = useState({ name: "", organizationId: "" });

    
    const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchData = async () => {
    try {
      const deptRes = await axios.get(`${API_URL}/org/departments`, { withCredentials: true });
      const orgRes = await axios.get(`${API_URL}/org/organizations`,{ withCredentials: true });
    console.log(deptRes.data);
    console.log(orgRes.data.org)

      setDepartments(deptRes.data.department || deptRes.data);
      setOrganizations(orgRes.data.org || orgRes.data);
    } catch {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/org/department`, form,{ withCredentials: true });
      toast.success("Department created!");
      setForm({ name: "", organizationId: "" });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating department");
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        🏢 Manage Departments
      </Typography>

      <Box
        component="form"
        onSubmit={handleCreate}
        sx={{
          backgroundColor: "#f9f9f9",
          padding: 3,
          borderRadius: 2,
          boxShadow: 2,
          mb: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          ➕ Create Department
        </Typography>
        <TextField
          label="Department Name"
          name="name"
          fullWidth
          value={form.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          select
          label="Select Organization"
          name="organizationId"
          fullWidth
          value={form.organizationId}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        >
          {organizations.map((org) => (
            <MenuItem key={org._id} value={org._id}>
              {org.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        📋 All Departments
      </Typography>
      <Grid container spacing={2}>
        {departments.map((dept) => (
          <Grid item xs={12} md={6} lg={4} key={dept._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{dept.name}</Typography>
                <Typography variant="body2">
                  Organization: {dept.organizationId?.name || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Departments;
