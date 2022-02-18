import { filter } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Chip, Typography, Stack, Button } from '@mui/material';
// utils
import getColorName from 'src/otherComponents/utils/getColorName';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
}));

const LabelStyle = styled((props) => (
  <Typography component="span" variant="subtitle2" {...props} />
))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------

function labelPriceRange(range) {
  if (range) {
    return `$${range[0]} - $${range[1]}`
  }
}

function labelMilesOdometer(range) {
  if (range) {
    return `${range[0]} - ${range[1]} miles`
  }
}

ShopTagFiltered.propTypes = {
  formik: PropTypes.object,
  filters: PropTypes.object,
  isShowReset: PropTypes.bool,
  isDefault: PropTypes.bool,
  onResetFilter: PropTypes.func,
};

export default function ShopTagFiltered({
  formik,
  filters,
  isShowReset,
  isDefault,
  onResetFilter,
}) {
  const theme = useTheme();
  const { values, handleSubmit, setFieldValue, initialValues } = formik;
  const { gender, category, colors, priceRange, rating, milesOdometer } = filters;
  const isShow = values !== initialValues && !isShowReset;

  const handleRemoveGender = (value) => {
    const newValue = filter(gender, (_item) => _item !== value);
    handleSubmit();
    setFieldValue('gender', newValue);
  };

  const handleRemoveCategory = () => {
    handleSubmit();
    setFieldValue('category', 'All');
  };

  const handleRemoveColor = (value) => {
    const newValue = filter(colors, (_item) => _item !== value);
    handleSubmit();
    setFieldValue('colors', newValue);
  };

  const handleRemovePrice = () => {
    setFieldValue('price', [0, 100000]);
    handleSubmit();
  };

  const handleRemoveMilesOdometer = () => {
    setFieldValue('milesOdometer', [0, 100000]);
    handleSubmit();
  };

  const handleRemoveRating = () => {
    handleSubmit();
    setFieldValue('rating', '');
  };

  console.log('ShopTagFiltered.js	115	priceRange, miles', priceRange, milesOdometer);

  return (
    <RootStyle>
      {gender.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Gender:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {gender.map((_gender) => (
              <Chip
                key={_gender}
                label={_gender}
                size="small"
                onDelete={() => handleRemoveGender(_gender)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {category !== '' && (
        <WrapperStyle>
          <LabelStyle>Category:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={category}
              onDelete={handleRemoveCategory}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {colors.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Colors:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {colors.map((color) => (
              <Chip
                key={color}
                label={getColorName(color)}
                size="small"
                onDelete={() => handleRemoveColor(color)}
                sx={{
                  m: 0.5,
                  bgcolor: color,
                  color: theme.palette.getContrastText(color),
                  ...((color === '#FFFFFF' || color === '#000000') && {
                    border: `solid 1px ${theme.palette.grey[500_32]}`,
                    '& .MuiChip-deleteIcon': {
                      color: 'text.disabled',
                    },
                  }),
                }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {(priceRange[0] !== 0 || priceRange[1] !== 100000) && (
        <WrapperStyle>
          <LabelStyle>Price:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={labelPriceRange(priceRange)}
              onDelete={handleRemovePrice}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {(milesOdometer[0] !== 0 || milesOdometer[1] !== 100000) && (
        <WrapperStyle>
          <LabelStyle>Miles on Odometer:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={labelMilesOdometer(milesOdometer)}
              onDelete={handleRemoveMilesOdometer}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {rating && (
        <WrapperStyle>
          <LabelStyle>Rating:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={sentenceCase(rating)}
              onDelete={handleRemoveRating}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {isShow && !isDefault && (
        <Button
          color="error"
          size="small"
          type="button"
          onClick={onResetFilter}
          startIcon={<Icon icon={roundClearAll} />}
        >
          Clear All
        </Button>
      )}
    </RootStyle>
  );
}
