import { useEffect, useState } from 'react';
import {
  Container, Box, Typography, Button, Grid, Card, CardContent, CircularProgress
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [okrs, setOkrs] = useState([]);
  const [loading, setLoading] = useState(true);
  
    const API_URL = import.meta.env.VITE_BACKEND_URL;

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      toast.error('Unauthorized. Please login again.');
      Cookies.remove('token');
    }
  };

  const getOKRs = async (teamId) => {
    try {
      const res = await axios.get(`${API_URL}/okrs/team/${teamId}`, { withCredentials: true });
      setOkrs(res.data.okr);
    } catch (err) {
      toast.error('Could not fetch OKRs');
    }
  };

  useEffect(() => {
    getUserInfo().then((userData) => {
      if (userData?.teamId) {
        getOKRs(userData.teamId);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name} 👋
        </Typography>
        <Typography variant="subtitle1">
          Role: <strong>{user?.role}</strong>
        </Typography>
        <Typography variant="subtitle1">
          Org: {user?.organizationId?.name || 'N/A'}
        </Typography>
        <Typography variant="subtitle1">
          Dept: {user?.departmentId?.name || 'N/A'}
        </Typography>
        <Typography variant="subtitle1">
          Team: {user?.teamId?.name || 'N/A'}
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your OKRs 🎯
        </Typography>
        <Grid container spacing={2}>
          {okrs.length > 0 ? (
            okrs.map((okr) => (
              <Grid item xs={12} sm={6} md={4} key={okr._id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">{okr.objective}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Progress: {okr.progress}%
                    </Typography>
                    {okr.keyResults.map((kr, i) => (
                      <Typography key={i} variant="body2">
                        • {kr.name} — {kr.progress}%
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No OKRs assigned yet.</Typography>
          )}
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => toast('Redirect to Create Org')}>
          + Create Organization
        </Button>
        <Button variant="contained" onClick={() => toast('Redirect to Create Dept')}>
          + Create Department
        </Button>
        <Button variant="contained" onClick={() => toast('Redirect to Create Team')}>
          + Create Team
        </Button>
        <Link to="/CreateOKR" >
        <Button variant="outlined" onClick={() => toast('Redirect to Create OKR')}>
          + Create OKR
        </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Dashboard;
