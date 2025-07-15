// src/pages/Home.tsx
import { Box, Typography, Button, Tooltip, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaTshirt, FaUtensils, FaCouch, FaHeart, FaBolt, FaGem, FaTv } from 'react-icons/fa';

const categories = [
  {
    name: 'Electronics',
    path: '/electronics',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    icon: <FaTv size={24} />,
  },
  {
    name: 'Clothes',
    path: '/clothes',
    gradient: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    icon: <FaTshirt size={24} />,
  },
  {
    name: 'Food',
    path: '/food',
    gradient: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
    icon: <FaUtensils size={24} />,
  },
  {
    name: 'Furniture',
    path: '/furniture',
    gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    icon: <FaCouch size={24} />,
  },
  {
    name: 'Cosmetics',
    path: '/cosmetics',
    gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
    icon: <FaHeart size={24} />,
  },
  {
    name: 'Lighting',
    path: '/lighting',
    gradient: 'linear-gradient(135deg, #f6d365, #fda085)',
    icon: <FaBolt size={24} />,
  },
  {
    name: 'Accessories',
    path: '/accessories',
    gradient: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
    icon: <FaGem size={24} />,
  },
];

export default function Home() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const diameter = isMobile ? 280 : 400;
  const center = diameter / 2;
  const radius = diameter / 2.5;

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #f9f9f9,)',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: diameter,
          height: diameter,
          mt: 6,
        }}
      >
        {categories.map((cat, index) => {
          const angle = (index / categories.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle) + center;
          const y = radius * Math.sin(angle) + center;

          return (
            <Tooltip title={cat.name} key={cat.name}>
              <Button
                onClick={() => navigate(cat.path)}
                sx={{
                  position: 'absolute',
                  top: y,
                  left: x,
                  transform: 'translate(-50%, -50%)',
                  width: isMobile ? 60 : 80,
                  height: isMobile ? 60 : 80,
                  borderRadius: '50%',
                  background: cat.gradient,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'translate(-50%, -50%) scale(1.1)',
                    boxShadow: 6,
                  },
                }}
              >
                {cat.icon}
              </Button>
            </Tooltip>
          );
        })}

        {/* Center Circle */}
        <Box
          sx={{
            position: 'absolute',
            top: center,
            left: center,
            transform: 'translate(-50%, -50%)',
            width: isMobile ? 80 : 100,
            height: isMobile ? 80 : 100,
            borderRadius: '50%',
            background: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: isMobile ? 14 : 16,
            boxShadow: 4,
          }}
        >
          Home
        </Box>
      </Box>
    </Box>
  );
}
