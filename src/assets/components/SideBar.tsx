import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles'; // Import styled

const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: string; 
}

export default function Sidebar({ open, onClose, drawerWidth }: SidebarProps) {
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Profile', path: '/profile' },
    { label: 'Clothes', path: '/clothes' },
    { label: 'Food', path: '/food' },
    { label: 'Furniture', path: '/furniture' },
    { label: 'Cosmetics', path: '/cosmetics' },
    { label: 'Motorcycle', path: '/motorcycle' },
    { label: 'Accessories', path: '/accessories' },
    { label: 'Signup', path: '/signup' },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth, 
        flexShrink: 0,
        height: '100vh', 
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'fixed',
          top: 0, 
          left: 0, 
          height: '100vh', 
        },
      }}
      variant="persistent" 
      anchor="left"
      open={open}
    >
      <AppBarOffset />
      <Box
        sx={{
          width: drawerWidth,
          bgcolor: 'black',
          height: 'calc(100% - 64px)',
          color: 'white',
          overflowY: 'auto', 
        }}
      >
        <List>
          {links.map((link) => (
            <ListItem key={link.path} disablePadding onClick={onClose}>
              <ListItemButton component={Link} to={link.path}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}