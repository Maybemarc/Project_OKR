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

const AdminTeams = () => {
  const [teams, setTeams] = useState([]);
   const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${API_URL}/org/teams`, {
        withCredentials: true,
      });
      setTeams(res.data.team || res.data);
    } catch {
      toast.error("Failed to load teams");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/admin/teams/${id}`, {
        withCredentials: true,
      });
      toast.success("Team deleted");
      fetchTeams();
    } catch {
      toast.error("Delete failed , Admin Only Access");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        🧑‍🤝‍🧑 Manage Teams
      </Typography>
      <Grid container spacing={3}>
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{team.name}</Typography>
                <Typography variant="body2">
                  Department: {team.departmentId?.name || "N/A"}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(team._id)}
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

export default AdminTeams;
