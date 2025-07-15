import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Pagination,
  // CircularProgress, 
  Alert 
} from '@mui/material';
import ProductCard from '../../components/ProductCard';
import ProductCardSkeleton from '../../components/ProductCardSkeleton';

interface DummyJsonProduct {
  id: number; 
  title: string;
  price: number;
  thumbnail: string;

}


interface ProductCardExpectedProduct {
  id: string;   
  name: string;
  price: string;
  image: string; 
}

export default function WomensShoes() {
  const [products, setProducts] = useState<ProductCardExpectedProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 20;
  const TARGET_ITEM_COUNT = 100;

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchAndDuplicateWomensShoes= async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products/category/womens-shoes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const baseWomensShoesItems: DummyJsonProduct[] = data.products; 

        if (!baseWomensShoesItems || baseWomensShoesItems.length === 0) {
          setError("No WomensShoes items found.");
          setProducts([]);
          return;
        }

        let duplicatedItems: ProductCardExpectedProduct[] = [];
        let currentCount = 0;
        let uniqueIdCounter = 0;

        while (currentCount < TARGET_ITEM_COUNT) {
          for (const item of baseWomensShoesItems) {
            if (currentCount >= TARGET_ITEM_COUNT) break;

            
            duplicatedItems.push({
              id: `dup-${item.id}-${uniqueIdCounter++}`, 
              name: item.title,                           
              price: `$${item.price.toFixed(2)}`,         
              image: item.thumbnail,                      
            });
            currentCount++;
          }
        }

        const shuffledItems = shuffleArray(duplicatedItems);
        setProducts(shuffledItems);
      } catch (err) {
        console.error("Error fetching WomensShoes:", err);
        setError("Failed to load WomensShoes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndDuplicateWomensShoes();
  }, []);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Food
      </Typography>

      {error ? (
        <Alert severity="error">{error}</Alert> 
      ) : (
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
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <Box key={index}> 
                  <ProductCardSkeleton />
                </Box>
              ))
            : paginatedProducts.map((product) => (
                <Box key={product.id}>
                  <ProductCard product={product} />
                </Box>
              ))}
        </Box>
      )}

      {!loading && !error && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(products.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}