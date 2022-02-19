import { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'src/mui/redux/store';
import { getProducts, filterProducts } from 'src/mui/redux/slices/product';
// routes
import { PATH_DASHBOARD } from 'src/mui/routes/paths';
// hooks
import useSettings from 'src/mui/hooks/useSettings';
// layouts
import Layout from 'src/mui/layouts';
// components
import Page from 'src/mui/components/Page';
import HeaderBreadcrumbs from 'src/mui/components/HeaderBreadcrumbs';
import { FormProvider } from 'src/mui/components/hook-form';
// sections
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
  ShopProductSearch,
} from 'src/mui/sections/@dashboard/e-commerce/shop';
import CartWidget from 'src/mui/sections/@dashboard/e-commerce/CartWidget';

// ----------------------------------------------------------------------

EcommerceShop.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { products, sortBy, filters } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Ecommerce: Shop">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Shop"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Shop' },
          ]}
        />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ShopProductSort />
          </Stack>
        </Stack>

        <Stack sx={{ mb: 3 }}>
          <>
            <Typography variant="body2" gutterBottom>
              <strong>{products.length}</strong>
              &nbsp;Products found
            </Typography>
          </>
        </Stack>

        <ShopProductList products={products} loading={!products.length} />
        <CartWidget />
      </Container>
    </Page>
  );
}
