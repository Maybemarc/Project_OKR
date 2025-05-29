import { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Box, Grid, Slider, Chip, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateOKR = () => {
  const [objective, setObjective] = useState('');
  const [keyResults, setKeyResults] = useState([{ name: '', progress: 0 }]);
  const [teamId, setTeamId] = useState('');
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [teams, setTeams] = useState([]);

   const API_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchTeamsAndUsers = async () => {
      try {
        const teamRes = await axios.get(`${API_URL}/org/teams`, { withCredentials: true }); // Make this route return all teams
        console.log(teamRes.data)
        setTeams(teamRes.data.team);

        const userRes = await axios.get(`${API_URL}/auth/users`, { withCredentials: true }); // Make this route return all users
        setUsers(userRes.data.users);
      } catch (err) {
        toast.error('Failed to fetch teams or users');
      }
    };

    fetchTeamsAndUsers();
  }, []);

  const handleKeyResultChange = (index, field, value) => {
    const updated = [...keyResults];
    updated[index][field] = value;
    setKeyResults(updated);
  };

  const handleAddKeyResult = () => {
    setKeyResults([...keyResults, { name: '', progress: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { objective, teamId, assignedTo, keyResults };
      await axios.post(`${API_URL}/okrs`, payload, { withCredentials: true });
      toast.success('OKR created successfully 🎯');
      setObjective('');
      setKeyResults([{ name: '', progress: 0 }]);
      setAssignedTo([]);
      setTeamId('');
    } catch (err) {
      toast.error('Error creating OKR');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New OKR
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          backgroundColor: '#fafafa',
          padding: 4,
          borderRadius: 3,
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        <TextField
          label="Objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Team</InputLabel>
          <Select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            label="Team"
            required
          >
            {teams.map((team) => (
              <MenuItem key={team._id} value={team._id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Assign Users</InputLabel>
          <Select
            multiple
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {selected.map((uid) => {
                  const u = users.find((u) => u._id === uid);
                  return <Chip key={uid} label={u?.name || uid} />;
                })}
              </Box>
            )}
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name} ({user.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>
          Key Results
        </Typography>

        <Grid container spacing={2}>
          {keyResults.map((kr, i) => (
            <Grid item xs={12} key={i}>
              <TextField
                fullWidth
                label={`Key Result ${i + 1}`}
                value={kr.name}
                onChange={(e) => handleKeyResultChange(i, 'name', e.target.value)}
                sx={{ mb: 2 }}
              />
              <Typography gutterBottom>Progress: {kr.progress}%</Typography>
              <Slider
                value={kr.progress}
                onChange={(e, newVal) => handleKeyResultChange(i, 'progress', newVal)}
                aria-label="Progress"
                valueLabelDisplay="auto"
              />
            </Grid>
          ))}
        </Grid>

        <Button variant="outlined" onClick={handleAddKeyResult}>
          + Add Key Result
        </Button>

        <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
          Create OKR
        </Button>
      </Box>
    </Container>
  );
};

export default CreateOKR;
