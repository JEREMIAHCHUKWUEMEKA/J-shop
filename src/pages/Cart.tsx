import { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
  Divider,
} from '@mui/material';
import CartItem from '../assets/components/CartItem';
import { CartContext } from '../assets/components/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, clearCart,  } = useContext(CartContext); 
  const navigate = useNavigate();

  const [feedbackStatus, setFeedbackStatus] = useState<'success' | 'error' | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleProceedToOrderSummary = () => {
    if (cart.length > 0) {
      navigate('/checkout/summary'); 
    } else {
      setFeedbackStatus('error');
      setFeedbackMessage('Your cart is empty. Please add items before proceeding.');
    }
  };

  const handleCloseSnackbar = () => {
    setFeedbackStatus(null);
    setFeedbackMessage('');
  };

  return (
    <Box sx={{ p: 4, minHeight: '80vh' }}>
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
          Your cart is empty. Start adding some awesome products!
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr',
            },
            alignItems: 'start',
          }}
        >
          <Box>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <Divider sx={{ my: 3 }} />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', 
              gap: 2, 
              maxWidth: 400, 
              mx: 'auto', 
              mt: 3,
            }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleProceedToOrderSummary}
                disabled={cart.length === 0}
                sx={{ py: 1.5 }}
              >
                Proceed to Order Summary
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={clearCart}
                disabled={cart.length === 0}
              >
                Clear Cart
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      <Snackbar
        open={feedbackStatus !== null}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={feedbackStatus === 'success' ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}