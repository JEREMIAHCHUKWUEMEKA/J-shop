import React, { useState, useContext } from 'react'; 
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  Button,
  Box,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../assets/components/CartContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart, cartTotal } = useContext(CartContext); // Get cartTotal from context directly

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null);
  const [paymentMessage, setPaymentMessage] = useState('');

  // React.useEffect(() => {
  //   if (cartTotal <= 0) { // Using cartTotal directly from context
  //     navigate('/cart');
  //   }
  // }, [cartTotal, navigate]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setFormError(null);
    setPaymentStatus(null);

    if (cartTotal <= 0) {
        setLoading(false);
        setPaymentStatus('error');
        setPaymentMessage('Cannot proceed with payment: Cart is empty or total is zero.');
        setTimeout(() => navigate('/cart'), 1500);
        return;
    }

    if (!stripe || !elements) {
      setLoading(false);
      setFormError("Stripe.js has not loaded. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
        setLoading(false);
        setFormError("Card input not found. Please refresh the page.");
        return;
    }

    try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: name,
            email: email,
          },
        });

        if (error) {
          console.error('[Stripe error]', error);
          setFormError(error.message || 'Payment failed. Please check your card details.');
          setPaymentStatus('error');
          setPaymentMessage(error.message || 'Payment failed.');
        } else {
          console.log('[PaymentMethod created for testing]', paymentMethod);
          setPaymentStatus('success');
          setPaymentMessage('Payment successful! Your order has been placed.');
          clearCart();
          setTimeout(() => navigate('/order-confirmation'), 2000);
        }
    } catch (err: any) {
        console.error("Payment processing error:", err);
        setFormError(err.message || "An unexpected error occurred during payment.");
        setPaymentStatus('error');
        setPaymentMessage(err.message || "An unexpected error occurred.");
    } finally {
        setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setPaymentStatus(null);
    setPaymentMessage('');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: 'auto', minHeight: '80vh' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Complete Your Payment
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Payment Details
        </Typography>

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        <TextField
          label="Name on Card"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 1 }}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 1 }}
        />
        <Box
          sx={{
            p: 1.5,
            border: '1px solid',
            borderColor: 'grey.400',
            borderRadius: '4px',
            bgcolor: 'background.paper',
            mb: 1,
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={!stripe || !elements || loading || cartTotal <= 0} // Disable if cart is empty
          sx={{ mt: 2, py: 1.5,backgroundColor:"black" }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : `Pay $${amount.toFixed(2)}`}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/checkout/summary')}
          sx={{ mt: 1 }}
        >
          Go Back to Summary
        </Button>
      </Box>

      <Snackbar
        open={paymentStatus !== null}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={paymentStatus === 'success' ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {paymentMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const PaymentPage: React.FC<CheckoutFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);

export default PaymentPage;