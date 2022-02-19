import { useEffect, useState } from 'react';
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useQuery } from '@apollo/client';
import { CARSQUERY } from 'src/mui/data/apollo';

import DashboardLayout from 'src/mui/layouts/dashboard';
// routes
import HeaderBreadcrumbs from 'src/mui/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/mui/routes/paths';
// components
import Page from 'src/mui/components/Page';
// sections
import { ShopProductList } from 'src/mui/sections/@dashboard/e-commerce/shop';
import {
  getVariants,
  filterProducts,
  getMakesQuery,
} from 'src/mui/redux/slices/vehicle';
import { useDispatch, useSelector } from 'src/mui/redux/store';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVariants());
  }, []);

  // const { products, sortBy, filters } = useSelector((state) => state.product);

  const { data, loading, error } = useQuery(CARSQUERY, { ssr: true });
  const products = data?.cars;
  console.log('These are the products from redux toolkit: ', products);
  console.log({ loading, error });
  console.log('This is data?.variants from the graphql query', data?.variants);
  const [cached, setCached] = useState(true);
  useEffect(() => {
    if (loading) setCached(false);
  }, [loading]);

  if (loading) return 'Loading...';

  return (
    <DashboardLayout>
      <Page title="Ecommerce: Shop">
        <Container>
          {/* <HeaderBreadcrumbs
            heading="Shop"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'E-Commerce',
                href: PATH_DASHBOARD.eCommerce.root,
              },
              { name: 'Shop' },
            ]}
          /> */}

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }} />
          </Stack>

          <Stack sx={{ mb: 3 }}>
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{data.variants.length}</strong>
                &nbsp;Total Vehicles Found
              </Typography>
            </>
          </Stack>
          <ShopProductList
            products={data?.variants}
            loading={!data?.variants.length}
          />
        </Container>
      </Page>
    </DashboardLayout>
  );
}
