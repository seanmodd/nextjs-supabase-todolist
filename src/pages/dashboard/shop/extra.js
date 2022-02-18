import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
// material
import {
  Backdrop,
  Container,
  Typography,
  CircularProgress,
  Stack,
  Pagination,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { PATH_DASHBOARD } from 'src/mui/routes/paths';
import {
  getVariants,
  filterProducts,
  getMakesQuery,
} from 'src/___redux/slices/product';
// utils
import fakeRequest from 'src/mui/utils/fakeRequest';
// hooks
import useSettings from 'src/mui/hooks/useSettings';
// components
import Page from 'src/mui/components/Page';
import HeaderBreadcrumbs from 'src/mui/components/HeaderBreadcrumbs';
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
} from 'src/mui/components/_dashboard/e-commerce/shop';
import DashboardLayout from 'src/mui/layouts/dashboard';
import { wrapperStore } from 'src/___redux/store.js';
import axios from 'axios';
import { USER_DATA, USER_FAVORITE_DATA } from 'src/utils/callbacks';
// pagination
import styles from 'src/styles/Home.module.css';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { getFavoriteList } from 'src/utils/localstorage';
import useAuth from 'src/mui/hooks/useAuth';

//* All data here comes from src/___redux/slices/product.js lines 220+ where the getVariants function is being exported!
//* This then calls an api with Axios which is referencing to localhost:3222/api/products which itself gets data from the graphql server on https://admin.shopcarx.com/graphql which comes back and retrieves data via a graphql setup
// ----------------------------------------------------------------------

const EcommerceShop = (props) => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAuth();

  // states
  const [openFilter, setOpenFilter] = useState(false);
  const [dataPerPage, setdataPerPage] = useState(24);
  const [pages, setPages] = useState(0);
  const [activePageCount, setActivePageCount] = useState(1);
  const [filtersData, setFiltersData] = useState();

  // shared states
  const [favouriteData, setFavouriteData] = USER_FAVORITE_DATA.useSharedState();
  const [userData] = USER_DATA.useSharedState();

  // router
  const router = useRouter();

  // initial state
  const state_products = useSelector((state) => state.product);
  const { products, sortBy, filters } = state_products.products.length
    ? state_products
    : props.initialReduxState.product;

  // functions
  const applyFilter = (products, sortBy, filters) => {
    // SORT BY
    if (sortBy === 'popularity') {
      products = orderBy(products, ['int_car_views'], ['desc']);
    }
    if (sortBy === 'miles') {
      products = orderBy(products, ['int_car_odometer'], ['asc']);
    }
    if (sortBy === 'newest') {
      products = orderBy(products, ['year'], ['desc']);
    }
    if (sortBy === 'priceDesc') {
      products = orderBy(products, ['price'], ['desc']);
    }
    if (sortBy === 'priceAsc') {
      products = orderBy(products, ['price'], ['asc']);
    }

    const newData = products?.map((item) => ({ ...item, isFavourite: false }));
    getFavouritesData(newData);
  };

  const getFavouritesData = (favouriteData) => {
    if (isAuthenticated) {
      if (userData) {
        favouriteData?.forEach((product, fIndex) => {
          userData.forEach((favorite, vIndex) => {
            if (product.id === favorite.variant) {
              (product.favoriteId = favorite.id), (product.isFavourite = true);
            }
          });
          return product;
        });

        const newData = JSON.parse(JSON.stringify(favouriteData));

        setFavouriteData(newData);
      } else {
        setFavouriteData(favouriteData);
      }
    } else {
      const localFavData = getFavoriteList();

      favouriteData?.forEach((product, fIndex) => {
        localFavData.forEach((favorite, vIndex) => {
          if (product.id === favorite) {
            (product.favoriteId = favorite), (product.isFavourite = true);
          }
        });
        return product;
      });

      const newData = JSON.parse(JSON.stringify(favouriteData));

      setFavouriteData(newData);
    }
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const updateFavoritesData = (variantId, id) => {
    const favData = [...favouriteData];
    favData.forEach((fItem, fIndex) => {
      if (fItem.id === variantId) {
        fItem.isFavourite = !fItem.isFavourite;
      }
      return fItem;
    });
    setFavouriteData(favData);
  };

  const onPageChange = (page) => {
    setActivePageCount(page);
    router.query.page = page;
    router.push(router);
  };

  const pageCountOnPagination = Math.ceil(pages / dataPerPage);
  const renderPagination = () => (
    <Pagination
      count={pageCountOnPagination}
      color="primary"
      page={activePageCount}
      onChange={(event, page) => onPageChange(page)}
    />
  );

  // form handling
  const formik = useFormik({
    initialValues: {
      makes: filters.makes,
      dealership: filters.dealership,
      category: filters.category,
      priceRange: filters.priceRange,
      milesOdometer: filters.milesOdometer,
    },
    onSubmit: async (values, { setSubmitting, setFieldValue }) => {
      setFieldValue();
      try {
        await fakeRequest(500);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const { values, resetForm, handleSubmit, isSubmitting, initialValues } =
    formik;

  const isDefault =
    values.priceRange[0] === 0 && values.priceRange[1] === 100000;
  values.milesOdometer[0] === 0 && values.milesOdometer[1] === 100000;
  values.makes?.length === 0 && values.category === '';

  // use Effects
  useEffect(() => {
    const params = {
      make: filters.makes,
      dealership: filters.dealership,
      type: filters.category || undefined,
      price_gte: filters.priceRange[0],
      price_lte: filters.priceRange[1],
      int_car_odometer_gte: filters.milesOdometer[0],
      int_car_odometer_lte: filters.milesOdometer[1],
      price_gt: sortBy === 'priceAsc' ? 1 : undefined,
    };

    const queryString = new URLSearchParams(params).toString();
    console.log('index.js	194	queryString', queryString);

    // queryString.entries();

    axios
      .get(`https://admin.shopcarx.com/variants/count`, { params })
      .then((res) => {
        if (res.data) {
          setPages(res.data);
        }
      });

    const gqlParams = params;
    gqlParams.sort_by_popularity = sortBy === 'popularity';

    dispatch(getVariants(dataPerPage, activePageCount, gqlParams));
  }, [filters, sortBy, dispatch, dataPerPage, activePageCount]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  useEffect(() => {
    getMakesQuery().then((res) => setFiltersData(res));
  }, []);

  useEffect(() => {
    applyFilter(products, sortBy, filters);
  }, [userData, products, sortBy, filters]);

  return (
    // <AuthGuard>
    // <DashboardLayout>
    <>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 0, mt: 0, px: 15 }}
      >
        {/* <CartWidget /> */}
      </Stack>
      {/* {!filteredProducts && SkeletonLoad} */}

      <Page title="Shop: All Vehicles | CarX">
        {values && (
          <Backdrop open={isSubmitting} sx={{ zIndex: 9999 }}>
            <CircularProgress />
          </Backdrop>
        )}

        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Shop: All Vehicles"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              // {
              //   name: 'E-Commerce',
              //   href: PATH_DASHBOARD.shop.root,
              // },
              { name: 'All Vehciles' },
            ]}
          />

          {favouriteData?.length > 0 && (
            <Typography gutterBottom>
              <Typography component="span" variant="subtitle1">
                {pages}
              </Typography>
              &nbsp;Vehicles found
            </Typography>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {renderPagination()}
            <select
              className={styles.paginationButton}
              value={dataPerPage}
              onChange={(e) => {
                setdataPerPage(e.target.value);
                router.query.perPage = e.target.value;
                router.push(router);
              }}
            >
              <option value="24">24 Vehicles per page</option>
              <option value="48">48 Vehicle per page</option>
              <option value="64">64 Vehicle per page</option>
            </select>
          </Box>

          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            <ShopTagFiltered
              filters={filters}
              formik={formik}
              isShowReset={openFilter}
              onResetFilter={handleResetFilter}
              isDefault={isDefault}
            />

            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ShopFilterSidebar
                products={favouriteData}
                formik={formik}
                filtersData={filtersData}
                isOpenFilter={openFilter}
                onResetFilter={handleResetFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
              <ShopProductSort />
            </Stack>
          </Stack>

          <ShopProductList
            updateFavoritesData={updateFavoritesData}
            products={favouriteData}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px',
            }}
          >
            {renderPagination()}
          </Box>
        </Container>
      </Page>
    </>
    // </DashboardLayout>
    // </AuthGuard>
  );
};

export const getServerSideProps = wrapperStore.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getVariants());
      const redux_store = store.getState();
      return {
        props: {
          initialReduxState: redux_store,
        },
      };
    }
);

export default EcommerceShop;
