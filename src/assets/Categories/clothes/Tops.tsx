// src/pages/Categories/MensShoes.tsx
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from '../../components/ProductCard';

export default function MensShoes() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/tops')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Tops</Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {products.map((product: any) => (
          <Box key={product.id}>
            <ProductCard
              name={product.title}
              price={`$${product.price}`}
              image={product.thumbnail}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
