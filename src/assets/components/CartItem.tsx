import {
  Box,
  Typography,
  IconButton,
  // Button, 
  Card,
  CardMedia,
  CardContent,
  Stack, 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import type { CartItem as CartItemType } from './CartContext'; 
import { CartContext } from './CartContext'; 
import { useContext } from 'react';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useContext(CartContext);

  const handleRemoveClick = () => {
    removeItem(item.id);
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        mb: 2,
        width: '100%',
        // maxWidth: 800, 
        // mx: 'auto', 
        alignItems: 'center',
        p: 1, 
      }}
    >
      <CardMedia
        component="img"
        image={item.image}
        alt={item.name}
        sx={{ width: 120, height: 120, objectFit: 'cover', mr: 2 }} 
      />
      <CardContent sx={{ flexGrow: 1, p: 1 }}> 
        <Typography variant="h6" component="div">
          {item.name}
        </Typography>
        <Typography color="text.secondary">
          Price: ${item.price.toFixed(2)} 
        </Typography>
        <Typography color="text.secondary">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size="small" onClick={handleDecreaseQuantity}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography variant="body1">{item.quantity}</Typography>
            <IconButton size="small" onClick={handleIncreaseQuantity}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </CardContent>

      <Box sx={{ p: 1 }}> 
        <IconButton
          aria-label="delete"
          onClick={handleRemoveClick}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}