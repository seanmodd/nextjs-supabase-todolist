import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'src/mui/hooks/useAuth';
import useIsMountedRef from 'src/mui/hooks/useIsMountedRef';
import { UploadAvatar } from 'src/mui/components/upload';
// utils
import { fData } from 'src/mui/utils/formatNumber';
//
import { countries } from 'src/mui/components/map/assets/countries';
import { USER_DATA } from 'src/utils/callbacks';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const [userData, setUserData] = useState({});

  const UpdateUserSchema = Yup.object().shape({
    // photoURL: Yup.string().required('Profile Image is required'),
    displayName: Yup.string().required('Name is required'),
    // city: Yup.string().required('City Name is required'),
    // phoneNumber: Yup.string().required('phoneNumber is required'),
    // country: Yup.string().required('country is required'),
    // address: Yup.string().required('address is required'),
    // state: Yup.string().required('state is required'),
    // city: Yup.string().required('city is required'),
    // zipCode: Yup.string().required('zipCode is required'),
    // about: Yup.string().required('about is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: userData?.displayName || '',
      email: userData?.email,
      photoURL: userData?.photoURL,
      phoneNumber: userData?.phoneNumber,
      country: userData?.country,
      address: userData?.address,
      state: userData?.state,
      city: userData?.city,
      zipCode: userData?.zipCode,
      about: userData?.about,
      isPublic: userData?.isPublic,
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        updateDetails(values);
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  const updateDetails = (values) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${userData.id}`, values)
      .then((response) => {
        enqueueSnackbar('Update success', { variant: 'success' });
      })
      .catch((err) => console.log(err));
  };

  const getUserProfile = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.strapijwt}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <UploadAvatar
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>

              <FormControlLabel
                control={
                  <Switch {...getFieldProps('isPublic')} color="primary" />
                }
                labelPlacement="start"
                label="Public Profile"
                sx={{ mt: 5 }}
              />
            </Card>
          </Grid> */}

          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    placeholder="Name"
                    error={Boolean(touched.displayName && errors.displayName)}
                    helperText={touched.displayName && errors.displayName}
                    {...getFieldProps('displayName')}
                  />
                  <TextField
                    fullWidth
                    disabled
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    {...getFieldProps('email')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    placeholder="Phone Number"
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    {...getFieldProps('phoneNumber')}
                  />
                  <TextField
                    fullWidth
                    placeholder="Address"
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                    {...getFieldProps('address')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                  </TextField>
                  <TextField
                    fullWidth
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                    placeholder="State/Region"
                    {...getFieldProps('state')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <div>
                    <TextField
                      fullWidth
                      placeholder="City"
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                      {...getFieldProps('city')}
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      placeholder="Zip/Code"
                      error={Boolean(touched.zipCode && errors.zipCode)}
                      helperText={touched.zipCode && errors.zipCode}
                      {...getFieldProps('zipCode')}
                    />
                  </div>
                </Stack>

                <TextField
                  {...getFieldProps('about')}
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={4}
                  placeholder="About"
                  error={Boolean(touched.about && errors.about)}
                  helperText={touched.about && errors.about}
                />
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
