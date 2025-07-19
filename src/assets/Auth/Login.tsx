import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
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
      bgcolor="linear-gradient(135deg, #f5f7fa, #c3cfe2)"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400, marginLeft:"10rem"}}>
        <Typography variant="h5" mb={3} align="center">
          Login
        </Typography>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor:"black" }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography mt={2} align="center">
          <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Forgot Password?
          </Link>
        </Typography>

        <Typography mt={1} align="center">
          Don't have an account?{' '}
          <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
