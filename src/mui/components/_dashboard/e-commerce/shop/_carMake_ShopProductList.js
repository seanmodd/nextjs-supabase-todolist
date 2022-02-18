import PropTypes from 'prop-types';
// material
import { Skeleton, Grid } from '@mui/material';
import CarMakeShopProductCard from './_carMake_ShopProductCard';

// ProductList.propTypes = {
//   products: PropTypes.array.isRequired,
//   isLoad: PropTypes.bool
// };

export default function ProductList({ products, isLoad, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <CarMakeShopProductCard product={product} />
        </Grid>
      ))}

      {/* {isLoad && SkeletonLoad} */}
    </Grid>
  );
}
