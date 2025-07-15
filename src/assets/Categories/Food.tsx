// src/assets/Categories/Food.tsx

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Pagination,
  // CircularProgress, // Import CircularProgress for loading indicator
  Alert // Import Alert for error display
} from '@mui/material';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

// Define the shape of the product coming directly from DummyJSON's API
interface DummyJsonProduct {
  id: number; // DummyJSON provides 'id' as a number
  title: string;
  price: number; // DummyJSON price is a number
  thumbnail: string;
  // Add other properties from DummyJSON if you use them elsewhere
}

// Define the shape of the product that ProductCard expects as its 'product' prop
// This should match the ApiProduct interface in ProductCard.tsx
interface ProductCardExpectedProduct {
  id: string;   // ProductCard expects ID as string (after our custom unique ID generation)
  name: string; // ProductCard expects 'name'
  price: string; // ProductCard expects 'price' as a string (e.g., "$12.99")
  image: string; // ProductCard expects 'image'
}

export default function Food() {
  // State now holds formatted products that match ProductCard's expectations
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
    const fetchAndDuplicateFood = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products/category/groceries');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const baseFoodItems: DummyJsonProduct[] = data.products; // Cast to the DummyJsonProduct type

        if (!baseFoodItems || baseFoodItems.length === 0) {
          setError("No Food items found.");
          setProducts([]);
          return;
        }

        let duplicatedItems: ProductCardExpectedProduct[] = []; // Array to store formatted products
        let currentCount = 0;
        let uniqueIdCounter = 0;

        while (currentCount < TARGET_ITEM_COUNT) {
          for (const item of baseFoodItems) {
            if (currentCount >= TARGET_ITEM_COUNT) break;

            // **Crucial Step:** Format the item to match the ProductCardExpectedProduct interface
            duplicatedItems.push({
              id: `dup-${item.id}-${uniqueIdCounter++}`, // Create a unique string ID
              name: item.title,                           // Map DummyJSON's 'title' to 'name'
              price: `$${item.price.toFixed(2)}`,         // Format numeric price back to string with '$'
              image: item.thumbnail,                      // Map DummyJSON's 'thumbnail' to 'image'
            });
            currentCount++;
          }
        }

        const shuffledItems = shuffleArray(duplicatedItems);
        setProducts(shuffledItems);
      } catch (err) {
        console.error("Error fetching Food:", err);
        setError("Failed to load Food. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndDuplicateFood();
  }, []);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Box p={4}
    sx={{backgroundColor:"#fafafa"}}>
      <Typography variant="h4" gutterBottom>
        Food
      </Typography>

      {error ? (
        <Alert severity="error">{error}</Alert> // Use Alert for a better error display
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
                <Box key={index}> {/* Keep Box wrapper for skeletons */}
                  <ProductCardSkeleton />
                </Box>
              ))
            : paginatedProducts.map((product) => (
                <Box key={product.id}>
                  {/* Pass the entire 'product' object as a single prop */}
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