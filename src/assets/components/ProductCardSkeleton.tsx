import { Card, CardContent, Skeleton, CardActions } from '@mui/material';

export default function ProductCardSkeleton() {
  return (
    <Card sx={{ maxWidth: 250, borderRadius: 2 }}>
      <Skeleton variant="rectangular" height={160} animation="wave" />
      <CardContent>
        <Skeleton variant="text" width="80%" height={28} animation="wave" />
        <Skeleton variant="text" width="60%" height={22} animation="wave" />
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Skeleton variant="circular" width={40} height={40} animation="wave" />
      </CardActions>
    </Card>
  );
}
