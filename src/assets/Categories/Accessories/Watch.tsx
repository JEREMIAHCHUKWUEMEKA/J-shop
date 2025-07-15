// import { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import ProductCard from '../../components/ProductCard';

// interface WatchItem {
//   id: string;
//   name: string;
//   price: string;
//   img: string;
// }

// export default function Watch() {
//   const [watches, setWatches] = useState<WatchItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchWatches = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('https://watch-database1.p.rapidapi.com/search-watches-by-name', {
//           method: 'POST',
//           headers: {
//             'x-rapidapi-key': '45ff2c4305msh1578863d76ae4a5p104d68jsn8b77e9ec4c4c',
//             'x-rapidapi-host': 'watch-database1.p.rapidapi.com',
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: new URLSearchParams({}) // empty to fetch all watches
//         });

//         const data = await response.json();
//         setWatches(data?.results || []);
//       } catch (err) {
//         console.error('Failed to fetch watches:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWatches();
//   }, []);

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>Watches</Typography>

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
//               lg: 'repeat(4, 1fr)',
//             },
//           }}
//         >
//           {watches.map((watch, i) => (
//             <Box key={i}>
//               <ProductCard
//                 name={watch.name}
//                 price={`$${watch.price || 'N/A'}`}
//                 image={watch.img || 'https://via.placeholder.com/150?text=No+Image'}
//               />
//             </Box>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// }
