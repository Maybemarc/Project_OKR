import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Grid,
  Box,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const UserProgress = () => {
  const { user } = useAuth();
  const [okrs, setOkrs] = useState([]);

    const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchOKRs = async () => {
      try {
        const res = await axios.get(`${API_URL}/okrs/userprogress/${user._id}`, {
          withCredentials: true,
        });
        setOkrs(res.data.okrs || []);
      } catch {
        toast.error("Failed to load user OKRs");
      }
    };

    if (user?._id) fetchOKRs();
  }, [user]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📊 Your Progress
      </Typography>

      <Grid container spacing={3}>
        {okrs.length > 0 ? (
          okrs.map((okr) => (
            <Grid item xs={12} sm={6} md={4} key={okr._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🎯 {okr.objective}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Progress: {okr.progress}%
                  </Typography>
                  <Box sx={{ width: "100%", mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={okr.progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#eee",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#1976d2",
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No OKRs assigned to you yet.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default UserProgress;
