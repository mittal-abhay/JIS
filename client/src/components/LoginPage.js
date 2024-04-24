import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" name="username" variant="outlined" fullWidth margin="normal" value={formData.username} onChange={handleChange} />
          <TextField label="Password" name="password" variant="outlined" type="password" fullWidth margin="normal" value={formData.password} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary" fullWidth>Sign In</Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
