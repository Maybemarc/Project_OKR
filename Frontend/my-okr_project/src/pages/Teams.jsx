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

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: "", departmentId: "" });

   const API_URL = import.meta.env.VITE_BACKEND_URL;


  const fetchData = async () => {
    try {
      const teamRes = await axios.get(`${API_URL}/org/teams`, { withCredentials: true });
      const deptRes = await axios.get(`${API_URL}/org/departments`, { withCredentials: true });
      console.log(teamRes.data);
      console.log(deptRes);
      setTeams(teamRes.data.team || teamRes.data); // handles both {team:[]} and []
      setDepartments(deptRes.data.department || deptRes.data); // same
    } catch {
      toast.error("Failed to load teams or departments");
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
      await axios.post(`${API_URL}/org/team`, form,{ withCredentials: true });
      toast.success("Team created!");
      setForm({ name: "", departmentId: "" });
      fetchData(); // refresh teams list
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating team");
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        🧑‍🤝‍🧑 Manage Teams
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
          ➕ Create Team
        </Typography>
        <TextField
          label="Team Name"
          name="name"
          fullWidth
          value={form.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          select
          label="Select Department"
          name="departmentId"
          fullWidth
          value={form.departmentId}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        >
          {departments.map((dept) => (
            <MenuItem key={dept._id} value={dept._id}>
              {dept.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        📋 All Teams
      </Typography>
      <Grid container spacing={2}>
        {teams.map((team) => (
          <Grid item xs={12} md={6} lg={4} key={team._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{team.name}</Typography>
                <Typography variant="body2">
                  Department: {team.departmentId?.name || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Org ID: {team.departmentId?.organizationId || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Teams;
