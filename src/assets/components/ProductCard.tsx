import { useContext } from 'react';
import { CartContext } from './CartContext';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardActions
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

interface ApiProduct {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: ApiProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const parsedPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    if (isNaN(parsedPrice)) return;

    const productForCart = {
      id: product.id,
      name: product.name,
      price: parsedPrice,
      image: product.image,
    };

    addToCart(productForCart);
  };

  return (
    <Card sx={{ maxWidth: 250, borderRadius: 2 }}>
      <Link
        to={`/product/${product.id}`}
        state={{ product }} 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardMedia
          component="img"
          height="160"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h6" noWrap>{product.name}</Typography>
          <Typography color="text.secondary">{product.price}</Typography>
        </CardContent>
      </Link>

      <CardActions sx={{ justifyContent: 'flex-end', backgroundColor: 'black' }}>
        <IconButton color="primary" onClick={handleAddToCart}>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
