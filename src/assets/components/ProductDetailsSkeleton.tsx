import {
    Box,
    Skeleton,
    Typography,
    Stack,
  } from '@mui/material';
  
  export default function ProductDetailsSkeleton() {
    return (
      <Box p={4} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        <Box width={{ xs: '100%', md: '50%' }}>
          <Skeleton variant="rectangular" width="100%" height={400} />
        </Box>
  
        <Box flex={1}>
          <Typography variant="h4" gutterBottom>
            <Skeleton width="60%" />
          </Typography>
  
          <Skeleton width="30%" height={30} />
          <Skeleton width="40%" height={40} sx={{ my: 2 }} />
  
          <Stack spacing={1} mb={3}>
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="80%" height={20} />
          </Stack>
  
          <Box display="flex" gap={2} mt={2}>
            <Skeleton variant="rectangular" width={100} height={40} />
            <Skeleton variant="rectangular" width={150} height={40} />
          </Box>
        </Box>
      </Box>
    );
  }
  