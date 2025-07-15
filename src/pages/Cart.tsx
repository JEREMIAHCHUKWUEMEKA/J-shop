// src/pages/Cart.tsx

import { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
  Divider, // Keep Divider if you want to separate cart items from action buttons
} from '@mui/material';
import CartItem from '../assets/components/CartItem';
import { CartContext } from '../assets/components/CartContext';
import { useNavigate } from 'react-router-dom';

// REMOVED: No longer importing PaymentForm here, as it's a separate page
// import PaymentForm from './PaymentForm'; // This import is no longer needed

export default function CartPage() {
  const { cart, clearCart,  } = useContext(CartContext); // Keep cartTotal for disabling buttons
  const navigate = useNavigate();

  // States for Snackbar feedback (kept for "cart empty" message only)
  const [feedbackStatus, setFeedbackStatus] = useState<'success' | 'error' | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleProceedToOrderSummary = () => {
    if (cart.length > 0) {
      navigate('/checkout/summary'); // Navigate to the Order Summary page
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

      {/* Conditional rendering for empty cart */}
      {cart.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
          Your cart is empty. Start adding some awesome products!
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            // Only one main column for cart items, as summary is a separate page
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr',
            },
            alignItems: 'start',
          }}
        >
          {/* Main Content Area for Cart Items */}
          <Box>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <Divider sx={{ my: 3 }} /> {/* Separator before action buttons */}

            {/* Action Buttons for Cart Page */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Center buttons horizontally
              gap: 2, // Spacing between buttons
              maxWidth: 400, // Constrain width of buttons
              mx: 'auto', // Center the button container
              mt: 3, // Margin top to separate from cart items
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

      {/* Snackbar for "cart empty" feedback */}
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