// // src/pages/Watches/BrandWatches.tsx
// import { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import ProductCard from '../../components/ProductCard';

// export default function BrandWatches() {
//   const { brand } = useParams();
//   const [watches, setWatches] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchWatches = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`http://localhost:4000/api/watches?brand=${brand}`, {
//           headers: {
//             Authorization: 'Bearer PLx6Od1buJEpzzc5u7KF3tPMKDZ1Oe9XqD30y67i',
//           },
//         });
//         const data = await res.json();
//         setWatches(data.data);
//       } catch (error) {
//         console.error('Failed to fetch watches', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWatches();
//   }, [brand]);

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>{brand} Watches</Typography>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <Box
//           sx={{
//             display: 'grid',
//             gap: 3,
//             gridTemplateColumns: {
//               xs: 'repeat(1, 1fr)',
//               sm: 'repeat(2, 1fr)',
//               md: 'repeat(3, 1fr)',
//             },
//           }}
//         >
//           {watches.map((watch: any) => (
//             <ProductCard
//               key={watch.id}
//               name={watch.name}
//               price={watch.price ? `$${watch.price}` : 'N/A'}
//               image={watch.thumbnail || 'https://dummyimage.com/300x300/ccc/fff&text=Watch'}
//             />
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// }
