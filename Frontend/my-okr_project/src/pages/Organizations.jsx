import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [orgName, setOrgName] = useState("");
      const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchOrganizations = async () => {
    try {
      const res = await axios.get(`${API_URL}/org/organizations`,{ withCredentials: true });
      console.log(res.data);
      setOrganizations(res.data.org || res.data);
    } catch (err) {
      toast.error("Failed to fetch organizations");
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/org/organization`, { name: orgName },{ withCredentials: true });
      toast.success("Organization created!");
      setOrgName("");
      fetchOrganizations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Creation failed");
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        🏛️ Manage Organizations
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
          ➕ Create Organization
        </Typography>
        <TextField
          label="Organization Name"
          fullWidth
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        📋 All Organizations
      </Typography>
      <Grid container spacing={2}>
        {organizations.map((org) => (
          <Grid item xs={12} md={6} lg={4} key={org._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{org.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Organizations;
