import { useState } from 'react';
import { Icon } from '@iconify/react';
import { paramCase, sentenceCase } from 'change-case';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';
import clockFill from '@iconify/icons-eva/clock-fill';
import client from 'src/__graphql/apolloClient_and_queries';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';

import Link from 'next/link';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useFormik, Form, FormikProvider, useField } from 'formik';
// material
import { useTheme, styled, alpha } from '@mui/material/styles';
import {
  Box,
  Link as MuiLink,
  Stack,
  Button,
  Rating,
  Grid,
  Tab,
  Tooltip,
  Divider,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';
// redux

import { useDispatch, useSelector } from 'react-redux';
import { addCart, onGotoStep } from 'src/___redux/slices/product';
// routes
import { PATH_DASHBOARD } from 'src/mui/routes/paths';
// utils
import { fShortenNumber, fCurrency } from 'src/mui/utils/formatNumber';
//
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import axios from 'axios';
import Label from 'src/mui/components/Label';
import { MIconButton } from 'src/mui/components/@material-extend';
import ColorSinglePicker from 'src/___redux/slices/productColorSinglePicker';

// ----------------------------------------------------------------------
const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    // description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: roundVerified,
  },
  {
    title: '10 Day Replacement',
    // description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: clockFill,
  },
  {
    title: 'Year Warranty',
    // description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: roundVerifiedUser,
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));
const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />,
  },
  {
    name: 'Instagram',
    icon: (
      <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
    ),
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />,
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />,
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

const Incrementer = (props) => {
  const [field, , helpers] = useField(props);
  // eslint-disable-next-line react/prop-types
  const { available } = props;
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <MIconButton
        size="small"
        color="inherit"
        disabled={value <= 1}
        onClick={decrementQuantity}
      >
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        {value}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

export default function ProductDetailsSumary() {
  const [value, setValue] = useState('1');
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  // const navigate = useNavigate();
  const router = useRouter();
  const dispatch = useDispatch();
  const { product, checkout } = useSelector((state) => state.product);

  const [inquiryModal, setInquiryModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // const [submitting, setSubmitting] = useState(false)

  const carVariant = product.variant;
  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    // colors,
    available,
    priceSale,
    // totalRating,
    // totalReview,
    // inventoryType,
  } = product;
  const colors = carVariant.car_colorLabel;

  const vehicleStatus = carVariant.vehicle_status;
  const alreadyProduct = checkout.cart.map((item) => item.id).includes(id);
  const isMaxQuantity =
    checkout.cart
      .filter((item) => item.id === id)
      .map((item) => item.quantity)[0] >= available;

  const onAddCart = (product) => {
    dispatch(addCart(product));
  };

  const handleBuyNow = () => {
    dispatch(onGotoStep(0));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      name,
      cover,
      available,
      price,
      // color: colors[0],
      color: carVariant.car_colorLabel,
      // size: sizes[4],
      quantity: available < 1 ? 0 : 1,
    },
    onSubmit: async (values, { setSubmit }) => {
      setInquiryModal(true);
      // try {
      //   if (!alreadyProduct) {
      //     onAddCart({
      //       ...values,
      //       subtotal: values.price * values.quantity,
      //     });
      //   }
      //   setSubmit(false);
      //   handleBuyNow();
      //   // navigate(PATH_DASHBOARD.shop.checkout);
      //   router.push(PATH_DASHBOARD.shop.checkout);
      // } catch (error) {
      //   setSubmit(false);
      // }
    },
  });

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  const handleAddCart = () => {
    onAddCart({
      ...values,
      subtotal: values.price * values.quantity,
    });
  };
  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const DescriptionPanelBox = () => (
    <TabContext value={value}>
      <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
        <TabList onChange={handleChangeTab}>
          <Tab disableRipple value="1" label="Description" />
          <Tab
            disableRipple
            value="2"
            // label={`Review (${product.reviews.length})`}
            label="Highlights"
            sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
          />
        </TabList>
      </Box>

      <TabPanel value="1">
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
            Total Miles
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 0.5, fontWeight: 400 }}>
            {numberWithCommas(carVariant.int_car_odometer)}
          </Typography>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
            Exterior Color
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 0.5, fontWeight: 400 }}>
            {carVariant.car_exteriorColor}
          </Typography>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </TabPanel>
      <TabPanel value="2">
        <Grid container sx={{ my: 8 }}>
          {PRODUCT_DESCRIPTION.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Box
                sx={{
                  my: 2,
                  mx: 'auto',
                  maxWidth: 280,
                  textAlign: 'center',
                }}
              >
                <IconWrapperStyle>
                  <Icon icon={item.icon} width={36} height={36} />
                </IconWrapperStyle>
                <Typography variant="subtitle1" gutterBottom>
                  {item.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </TabContext>
  );

  const confirm = () => {
    axios
      .post('/api/sendemail', {
        senderEmail: email,
        phoneNumber: phone,
        car_vin: carVariant.car_vin,
        make: carVariant.make,
        model: carVariant.model,
      })
      .then((res) => {
        if (res.data === 200) {
          setInquiryModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <RootStyle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Link
            style={{ cursor: 'pointer' }}
            // href={`category/${carVariant.product.name}`}
            href={`category/${carVariant.name}`}
          >
            <Typography
              variant="overline"
              style={{ cursor: 'pointer', fontSize: '36px' }}
              sx={{
                mt: 2,
                cusor: 'pointer',
                mb: 1,
                display: 'block',
                color: status === 'sale' ? 'error.main' : 'info.main',
              }}
            >
              {carVariant.name}
            </Typography>
          </Link>

          <Typography sx={{ mb: '5px' }} variant="h5" paragraph>
            {carVariant.year} {carVariant.car_name}
          </Typography>

          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={vehicleStatus == 'Pre-Owned' ? 'secondary' : 'success'}
            sx={{ textTransform: 'uppercase', mb: '5px' }}
          >
            {vehicleStatus}
          </Label>
          <Typography variant="h4" sx={{ mb: 3 }}>
            <Box
              component="span"
              sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
            >
              {priceSale && fCurrency(priceSale)}
            </Box>
            &nbsp;{fCurrency(carVariant.price)}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />
          {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}
          {/* <Grid item xs={12} md={6} lg={5}> */}
          <DescriptionPanelBox />
          {/* </Grid> */}
          <Stack spacing={3} sx={{ my: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Interior Color
              </Typography>
              {carVariant.car_interiorColor} */}
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              {/* <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Quantity
              </Typography>
              <div>
                <Incrementer name="quantity" available={available} />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    display: 'block',
                    textAlign: 'right',
                    color: 'text.secondary',
                  }}
                >
                  Available: {available}
                </Typography>

                <FormHelperText error>
                  {touched.quantity && errors.quantity}
                </FormHelperText>
              </div> */}
            </Stack>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ mt: 5 }}
          >
            <Button
              fullWidth
              disabled={isMaxQuantity}
              size="large"
              type="button"
              color="warning"
              variant="contained"
              startIcon={<Icon icon={roundAddShoppingCart} />}
              onClick={handleAddCart}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add to Cart
            </Button>
            <Button fullWidth size="large" type="submit" variant="contained">
              Buy Now
            </Button>
          </Stack>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box>
        </Form>
      </FormikProvider>
      <Dialog
        fullWidth
        open={inquiryModal}
        onClose={() => setInquiryModal(false)}
      >
        <DialogTitle>Next Steps...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A specialized CarX Expert Buyer will be in contact with you
            immediately!
          </DialogContentText>
          <TextField
            // error={Boolean(!email) && submitting}
            helperText={!email && ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            style={{ marginBottom: '20px' }}
          />
          <TextField
            // error={Boolean(!phone) && submitting}
            helperText={!phone && ''}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxlength={10}
            autoFocus
            margin="dense"
            id="name"
            label="Mobile Number"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={() => setInquiryModal(false)}>
            Cancel
          </Button>
          <Button size="large" disabled={!email && !phone} onClick={confirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </RootStyle>
  );
}
