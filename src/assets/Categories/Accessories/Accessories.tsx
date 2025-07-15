import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'SmartPhones', path: '/smart-phones' },
  // { name: 'Fragrances', path: '/fragrances' },
  { name: 'Laptops', path: '/laptops' },
];

export default function Accessories () {
  const navigate = useNavigate();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
      Accessories
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'flex-start'
        }}
      >
        {categories.map((category) => (
          <Card
            key={category.path}
            sx={{
              width: 220,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              boxShadow: 3,
              cursor: 'pointer'
            }}
            onClick={() => navigate(category.path)}
          >
            <CardActionArea sx={{ height: '100%', width: '100%' }}>
              <CardContent>
                <Typography align="center" variant="h6">
                  {category.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
