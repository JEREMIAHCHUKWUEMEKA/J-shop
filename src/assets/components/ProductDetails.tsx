import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CardMedia,
  IconButton,
  Rating,
  Stack,
  TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';

export default function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = state?.product;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  const parsedPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <Box p={4}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            width: { xs: '100%', md: 350 },
            height: 350,
            objectFit: 'cover',
            borderRadius: 2
          }}
        />

        <Box flex={1}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Rating value={product.rating || 4.5} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.rating || '4.5'} / 5)
            </Typography>
          </Stack>

          <Typography variant="h5" color="primary" gutterBottom>
            {product.price}
          </Typography>

          <Typography variant="body1" paragraph>
          There are actually no details available here, i am just trying my best to impliment so many components, so my website is going to look good.
          If you are a backend-developer, please be creating open free endpoints for e-shops with a minimum of 50 items.I had to duplicate the ones here so they could reach 100 and make the pages look better.
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} mt={2}>
            <Typography variant="subtitle1">Quantity:</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton size="small" onClick={handleDecrease}>
                <RemoveIcon />
              </IconButton>
              <TextField
                value={quantity}
                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                size="small"
                sx={{ width: 50 }}
              />
              <IconButton size="small" onClick={handleIncrease}>
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Button
            variant="contained"
            size="large"
            sx={{ mt: 3 , backgroundColor:"black"}}
            onClick={() =>
              addToCart(
                {
                  id: product.id,
                  name: product.name,
                  price: parsedPrice,
                  image: product.image
                },
                quantity
              )
            }
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
