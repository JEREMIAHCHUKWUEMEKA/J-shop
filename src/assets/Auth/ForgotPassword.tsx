import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    setError('');
    setMessage('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Check your inbox for the reset link.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f4f6f8"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3} align="center">
          Forgot Password
        </Typography>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        {message && (
          <Typography color="success.main" mb={2}>
            {message}
          </Typography>
        )}

        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 ,backgroundColor:"black"}}
          onClick={handleReset}
        >
          Send Reset Link
        </Button>

        <Typography mt={2} align="center">
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Back to Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
