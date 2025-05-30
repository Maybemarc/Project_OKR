import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, TextField, Typography, Button, Slider, Box, Select, MenuItem, Chip, FormControl, InputLabel
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditOKR = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [objective, setObjective] = useState('');
  const [keyResults, setKeyResults] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [users, setUsers] = useState([]);

    const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchOKRAndUsers = async () => {
      try {
        const [okrRes, userRes] = await Promise.all([
          axios.get(`${API_URL}/okrs/${id}`, { withCredentials: true }),
          axios.get(`${API_URL}/auth/users`, { withCredentials: true }),
        ]);
        const okr = okrRes.data.okr;
        setObjective(okr.objective);
        setKeyResults(okr.keyResults);
        setAssignedTo(okr.assignedTo.map((u) => u._id));
        console.log(userRes.data)
        setUsers(userRes.data.users);
      } catch {
        toast.error('Failed to load OKR or users');
      }
    };
    fetchOKRAndUsers();
  }, [id]);

  const handleKeyResultChange = (index, field, value) => {
    const updated = [...keyResults];
    updated[index][field] = value;
    setKeyResults(updated);
  };

  const handleAddKeyResult = () => {
    setKeyResults([...keyResults, { name: '', progress: 0 }]);
  };

  const handleDeleteKeyResult = (index) => {
    const updated = keyResults.filter((_, i) => i !== index);
    setKeyResults(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/okrs/update/${id}`, { objective, keyResults, assignedTo }, {
          withCredentials: true,
        });
      toast.success('OKR updated successfully!');
      navigate('/secure/okrs');
    } catch {
      toast.error('Failed to update OKR');
    }
  };

  return (
    <Container maxWidth="md" className="edit-okr" >
      <Typography variant="h4" gutterBottom>
        ✏️ Edit OKR
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ gap: 3 }}>
        <TextField
          label="Objective"
          fullWidth
          required
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Assigned Users</InputLabel>
          <Select
            multiple
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selected.map((uid) => {
                  const user = users.find((u) => u._id === uid);
                  return <Chip key={uid} label={user?.name || uid} />;
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

        <Typography variant="h6">Key Results</Typography>
        {keyResults.map((kr, i) => (
          <Box key={i} className="kr-block">
            <TextField
              fullWidth
              label={`Key Result ${i + 1}`}
              value={kr.name}
              onChange={(e) => handleKeyResultChange(i, 'name', e.target.value)}
              sx={{ mb: 1 }}
            />
            <Slider
              value={kr.progress}
              onChange={(e, val) => handleKeyResultChange(i, 'progress', val)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteKeyResult(i)}
              sx={{ mt: 1 }}
            >
              Remove
            </Button>
          </Box>
        ))}

        <Button variant="outlined" onClick={handleAddKeyResult} sx={{ mt: 2 }}>
          + Add Key Result
        </Button>

        <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EditOKR;
