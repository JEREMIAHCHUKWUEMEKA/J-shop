import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Motorcycle from './Motorcycle';
import Automotive from './Automotive';

export default function Automobile() {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Automobile</Typography>
      <Box mt={4}>
        <Automotive />
      </Box>
      <Box mt={4}>
        <Motorcycle />
      </Box>
    </Box>
  );
}