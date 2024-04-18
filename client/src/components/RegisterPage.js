import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material'; // Import MUI components
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, role } = formData;
    
    // Password length validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("kjsdjnfkjds");
        setError(errorData.message); // Set error message
      } else {
        // Handle successful registration
        navigate('/login');
        setError(''); // Clear any previous error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred'); // Set error message for unexpected errors
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" name="username" variant="outlined" fullWidth margin="normal" value={formData.username} onChange={handleChange} />
          <TextField label="Password" name="password" variant="outlined" type="password" fullWidth margin="normal" value={formData.password} onChange={handleChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="judge">Judge</MenuItem>
              <MenuItem value="registrar">Registrar</MenuItem>
              <MenuItem value="lawyer">Lawyer</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>} {/* Display error message if exists */}
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
