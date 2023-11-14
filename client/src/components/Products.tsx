import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Product } from '../types';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  showHeader?: boolean;
}

export default function Products({ products, showHeader = true }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          pl: 4,
          pr: 4,
          mt: 2,
          alignItems: 'center',
          width: '100%',
          maxWidth: '2000px',
        }}>
        {showHeader && (
          <Typography
            gutterBottom
            variant='h6'
            sx={{ pt: 2, fontWeight: 'bold' }}>
            Today's picks
          </Typography>
        )}
        <Grid container spacing={1}>
          {products.map((product) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={6}
              lg={4}
              xl={3}
              xxl={2}
              xxxl={1.7}
              key={product.id}>
              <ProductCard
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrls[0]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
