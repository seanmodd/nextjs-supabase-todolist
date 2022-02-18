import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  Typography,
  RadioGroup,
  FormControlLabel,
  Slider,
} from '@mui/material';
//
import { MIconButton } from 'src/mui/components/@material-extend';
import Scrollbar from 'src/mui/components/Scrollbar';
import ColorManyPicker from '../../../../ColorManyPicker';

// ----------------------------------------------------------------------
export const FILTER_CATEGORY_OPTIONS = ['New', 'Used'];
export const FILTER_RATING_OPTIONS = [
  'up4Star',
  'up3Star',
  'up2Star',
  'up1Star',
];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25,000' },
  { value: 'between', label: 'Between $25,0000 - $50,000' },
  { value: 'above', label: 'Above $50,000' },
];
export const FILTER_MILES = [
  { value: 'below', label: 'Below 20,000 miles' },
  { value: 'between', label: 'Between 20,000 miles - 60,000 miles' },
  { value: 'above', label: 'Above 60,000 miles' },
];

const miles = [
  { value: 0, label: '0' },
  { value: 25, label: '25k' },
  { value: 50, label: '50k' },
  { value: 75, label: '75k' },
  { value: 100, label: '100k' },
];

const prices = [
  { value: 0, label: '$0' },
  { value: 25, label: '25k' },
  { value: 50, label: '50k' },
  { value: 75, label: '75k' },
  { value: 100, label: '100k' },
];

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' },
};

export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object,
};

export default function ShopFilterSidebar({
  products,
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  formik,
  filtersData,
}) {
  const { values, getFieldProps, handleChange, setFieldValue } = formik;

  const [price, setPrice] = useState([0, 100]);
  const [mile, setMile] = useState([0, 100]);

  function valuePrice(value) {
    return value > 0 ? `$${value}k` : `${value}`;
  }

  function valueMile(value) {
    return value > 0 ? `${value}k Miles` : `${value}`;
  }

  function valueLabelFormatPrice(value) {
    return value > 0 ? `$${value}k` : value;
  }

  function valueLabelFormatMile(value) {
    return value > 0 ? `${value}k Miles` : value;
  }

  const handleChangePrice = (event, newValue) => {
    const priceArray = [newValue[0] * 1000, newValue[1] * 1000];
    setFieldValue('priceRange', priceArray);
    setPrice(newValue);
  };

  const handleChangeMile = (event, newValue) => {
    const milesArray = [newValue[0] * 1000, newValue[1] * 1000];
    setFieldValue('milesOdometer', milesArray);
    setMile(newValue);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Filters
              </Typography>
              <MIconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </MIconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Makes
                  </Typography>
                  <FormGroup>
                    {/* <div style={{
                      maxHeight: '200px',
                      overflowY: 'scroll'
                    }}>
                    </div> */}
                    {filtersData?.groupBy?.make?.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            {...getFieldProps('makes')}
                            value={item.key}
                            checked={values.makes?.includes(item.key)}
                          />
                        }
                        label={item.key}
                      />
                    ))}
                  </FormGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Dealership
                  </Typography>
                  <FormGroup>
                    {filtersData?.groupBy?.car_dealership?.map(
                      (item, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              {...getFieldProps('dealership')}
                              value={item.key}
                              checked={values.dealership?.includes(item.key)}
                            />
                          }
                          label={item.key}
                        />
                      )
                    )}
                  </FormGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Category
                  </Typography>
                  <RadioGroup {...getFieldProps('category')}>
                    {FILTER_CATEGORY_OPTIONS.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Price Range
                  </Typography>
                  <div title="Range" sx={style} style={{ marginTop: '50px' }}>
                    <Box sx={{ width: '100%' }}>
                      <Slider
                        step={10}
                        marks={prices}
                        value={price}
                        onChange={handleChangePrice}
                        valueLabelDisplay="on"
                        getAriaValueText={valuePrice}
                        valueLabelFormat={valueLabelFormatPrice}
                      />
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        width: '100%',
                        borderRadius: 1,
                        bgcolor: 'grey.50012',
                      }}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        Min Price: {valuePrice(price[0])}
                      </Typography>
                      <Typography variant="subtitle2">
                        Max Price: {valuePrice(price[1])}
                      </Typography>
                    </Box>
                  </div>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Miles on Odometer
                  </Typography>
                  <div title="Range" sx={style} style={{ marginTop: '50px' }}>
                    <Box sx={{ width: '100%' }}>
                      <Slider
                        step={10}
                        marks={miles}
                        value={mile}
                        onChange={handleChangeMile}
                        valueLabelDisplay="on"
                        getAriaValueText={valueMile}
                        valueLabelFormat={valueLabelFormatMile}
                      />
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        width: '100%',
                        borderRadius: 1,
                        bgcolor: 'grey.50012',
                      }}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        Min Miles: {valueMile(mile[0])}
                      </Typography>
                      <Typography variant="subtitle2">
                        Max Miles: {valueMile(mile[1])}
                      </Typography>
                    </Box>
                  </div>
                </div>
              </Stack>
            </Scrollbar>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}
