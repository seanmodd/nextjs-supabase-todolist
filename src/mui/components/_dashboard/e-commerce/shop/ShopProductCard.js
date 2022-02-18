import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// ? replaced already
import { Link as RouterLink } from 'next/link';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from 'src/mui/routes/paths';
// utils
import { fCurrency } from 'src/mui/utils/formatNumber';
//
import axios from 'axios';
import Router from 'next/router';
import useAuth from 'src/mui/hooks/useAuth';
import { UserContext, FeedbackContext } from 'src/mui/contexts';
import { USER_DATA, USER_FAVORITE_DATA } from 'src/utils/callbacks';
import { CircularProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { MIconButton } from 'src/mui/components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import {
  deleteItemFromFavoriteList,
  saveItemToFavoriteList,
} from 'src/utils/localstorage';
import Label from 'src/mui/components/Label';

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

export default function ShopProductCard({
  product,
  from,
  updateFavoritesData,
}) {
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
  const { user, isAuthenticated, guestLogin } = useAuth();
  // const { user, dispatchUser } = useContext(UserContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  // const makeName = product.product.name
  const makeName = car_make_name;
  const makeNameParamCase = paramCase(makeName);
  // const makeNameParamCase = makeName;
  // const linkTo = `/dashboard/shop/${id}`;
  const linkTo = `/dashboard/shop/${makeNameParamCase}/${id}`;
  const linkToMakeName = `/dashboard/shop/${makeNameParamCase}`;

  const stringPrice = product.car_price;
  const intPrice = parseInt(stringPrice);

  const [userData, setUserData] = USER_DATA.useSharedState();

  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const unFavoriteSnackbar = () => {
    closeSnackbar();
    enqueueSnackbar('You just unfavorited this vehicle ', {
      variant: 'error',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      ),
    });
  };

  const favoriteSnackbar = () => {
    closeSnackbar();
    enqueueSnackbar('You just favorited this vehicle', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      ),
    });
  };

  const errorFavoritingSnackbar = () => {
    closeSnackbar();
    enqueueSnackbar(
      `Something Went wrong, your Favorite Item is reverted, please try again later to favorite`,
      {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      }
    );
  };

  const onHeartPress = () => {
    console.log('ShopProductCard.js	118	product.id', product.id);

    if (!isAuthenticated) {
      if (product.isFavourite === true) {
        unFavoriteSnackbar();
        deleteItemFromFavoriteList(product.id);
      } else {
        favoriteSnackbar();
        saveItemToFavoriteList(product.id);
      }
      updateFavoritesData(product.id);
    } else if (product.isFavourite === true) {
      unFavoriteVehicle();
    } else {
      favoriteVehicle();
    }
  };

  const unFavoriteVehicle = () => {
    axios.delete(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/favorites/${product.favoriteId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.strapijwt}` },
      }
    );
    if (userData) {
      const favoriteData = JSON.parse(JSON.stringify(userData));
      const newData = favoriteData.filter((a) => a.variant != product.id);
      setUserData(newData);
    }
    updateFavoritesData(product.id);
  };

  const favoriteVehicle = () => {
    favoriteSnackbar();
    updateFavoritesData(product.id);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/favorites`,
        {
          variant: product.id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.strapijwt}` },
        }
      )
      .then((res) => {
        if (userData) {
          const obj = {
            id: res.data.id,
            variant: product.id,
          };
          setUserData([...userData, obj]);
        }
      })
      .catch((err) => {
        errorFavoritingSnackbar();
        updateFavoritesData(product.id);
      });
  };

  return (
    <Card>
      <Box width="10%" mx="1rem" my="0.5rem">
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <img
            src={`/static/icons/${
              product.isFavourite ? 'heart_filled.svg' : 'heart_empty.svg'
            }`}
            className="heart-icon"
            onClick={() => onHeartPress(product)}
          />
        )}
      </Box>
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
          <Typography variant="subtitle1">Year:</Typography>
          <Link href={linkTo} color="inherit" component={RouterLink}>
            <Typography variant="subtitle1">
              <Typography
                sx={{
                  color: 'text.disabled',
                }}
              >
                {product.year}
              </Typography>
            </Typography>
          </Link>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">Make:</Typography>
          <Link href={linkToMakeName} color="inherit" component={RouterLink}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.disabled',
                fontWeight: '200',
              }}
            >
              {product.car_make_name}
            </Typography>
          </Link>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">Model:</Typography>
          <Link href={linkTo} color="inherit" component={RouterLink}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.disabled',
                fontWeight: '200',
              }}
            >
              {product.model}
            </Typography>
          </Link>
        </Stack>

        <Stack direction="column" justifyContent="space-between">
          <Typography variant="subtitle1">Dealership:</Typography>
          <Link
            href={product.car_currentCarURL}
            color="inherit"
            component={RouterLink}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.disabled',
                lineHeight: '22.5px',
                height: '45px',
                maxLines: 2,
                fontWeight: '200',
              }}
            >
              {product.car_dealership}
            </Typography>
          </Link>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">Views Over Past 7 Days:</Typography>
          <Link href={linkTo} color="inherit" component={RouterLink}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.disabled',
                fontWeight: '200',
              }}
            >
              {product.int_car_views}
            </Typography>
          </Link>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">VIN:</Typography>
          <Link href={linkTo} color="inherit" component={RouterLink}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.disabled',
                fontWeight: '200',
              }}
            >
              {product.car_vin}
            </Typography>
          </Link>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">Price:</Typography>
          <Link href={linkTo} color="inherit" component={RouterLink}>
            <Typography variant="subtitle1">
              <Typography
                sx={{
                  color: 'text.disabled',
                }}
              >
                {intPrice === 0
                  ? 'Price available on request'
                  : fCurrency(intPrice)}
              </Typography>
            </Typography>
          </Link>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">Odometer:</Typography>
          <Link href={linkTo} color="inherit" component={RouterLink}>
            <Typography variant="subtitle1">
              <Typography
                sx={{
                  color: 'text.disabled',
                }}
              >
                {product.int_car_odometer}
              </Typography>
            </Typography>
          </Link>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">City MPG:</Typography>
          <Link href={linkTo} color="inherit" component={RouterLink}>
            <Typography variant="subtitle1">
              <Typography
                sx={{
                  color: 'text.disabled',
                }}
              >
                {product.city_mileage == 0
                  ? product.manufacture_data_manufacture_mpg_city
                  : product.city_mileage}
                mpg
              </Typography>
            </Typography>
          </Link>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">Highway MPG:</Typography>
          <Link href={linkTo} color="inherit" component={RouterLink}>
            <Typography variant="subtitle1">
              <Typography
                sx={{
                  color: 'text.disabled',
                }}
              >
                {product.highway_mileage == 0
                  ? product.manufacture_data_manufacture_mpg_highway
                  : product.highway_mileage}
                mpg
              </Typography>
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
