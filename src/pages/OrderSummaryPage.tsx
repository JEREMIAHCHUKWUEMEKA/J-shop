// src/pages/OrderSummaryPage.tsx

import  { useContext } from 'react'; // Keep React import if using React.Fragment or similar
import { Box, Typography, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../assets/components/CartContext';

export default function OrderSummaryPage() {
  const { cartTotal, cart } = useContext(CartContext);
  const navigate = useNavigate();

  // REMOVED: The useEffect hook for redirection is removed as per your request.
  // React.useEffect(() => {
  //   if (cart.length === 0) {
  //     navigate('/cart');
  //   }
  // }, [cart, navigate]);

  const handleProceedToPayment = () => {
    navigate('/checkout/payment');
  };

  const handleGoBackToCart = () => {
    navigate('/cart');
  };

  // Optional: Display a message if cart is empty, even if direct access is allowed
  if (cart.length === 0) {
    return (
      <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', minHeight: '80vh', textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary" sx={{ mt: 4 }}>
          Your cart is empty. Please add items to proceed to checkout.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/cart')} sx={{ mt: 3 }}>
          Go to Cart
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', minHeight: '80vh' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Order Summary
      </Typography>

      <Box sx={{
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 2,
        p: 3,
        bgcolor: 'background.paper',
        boxShadow: 1,
      }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Your Order
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* List of items in summary */}
        {cart.map(item => (
          <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">{item.name} (x{item.quantity})</Typography>
            <Typography variant="body1">${(item.price * item.quantity).toFixed(2)}</Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Items Total:</Typography>
          <Typography variant="body1">${cartTotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1">Shipping:</Typography>
          <Typography variant="body1">Free</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${cartTotal.toFixed(2)}</Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleProceedToPayment}
          disabled={cart.length === 0} // Keep disabled if cart is empty
          sx={{ mt: 3, py: 1.5,backgroundColor:"black" }}
        >
          Proceed to Payment
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleGoBackToCart}
          sx={{ mt: 2 }}
        >
          Go Back to Cart
        </Button>
      </Box>
    </Box>
  );
}