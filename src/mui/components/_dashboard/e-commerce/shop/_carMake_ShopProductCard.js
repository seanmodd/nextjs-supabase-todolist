import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// ? replaced already
// import { Link as RouterLink } from 'next/link';
import { Link as RouterLink } from 'next';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from 'src/mui/routes/paths';
// utils
import { fCurrency } from 'src/otherComponents/utils/formatNumber';
//
import Label from '../../../../Label';
// import ColorPreview from '../../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const {
    id,
    name,
    cover,
    price,
    colors,
    status,
    priceSale,
    images,
    car_make_name,
  } = product;
  const makeName = car_make_name;
  const makeNameParamCase = paramCase(makeName);
  // const linkTo = `/dashboard/shop/${id}`;
  const linkTo = `/dashboard/shop/${makeNameParamCase}/${id}`;
  const linkToMakeName = `/dashboard/shop/${makeNameParamCase}`;

  const stringPrice = product.car_price;
  const intPrice = parseInt(stringPrice);

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.car_make_name && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {product.vehicle_status}
          </Label>
        )}
        <Link href={linkTo} color="inherit" component={RouterLink}>
          <ProductImgStyle
            alt={name}
            // src={product.image_url}
            src={product.image_url || product.car_imgSrcUrl_1}
          />
        </Link>
      </Box>

      <Stack spacing={2} sx={{ p: 1.5 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href={linkToMakeName} color="inherit" component={RouterLink}>
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              />

              {product.car_make_name}
            </Typography>
          </Link>
        </Stack>
        <Link href={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {product.car_name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(intPrice)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
