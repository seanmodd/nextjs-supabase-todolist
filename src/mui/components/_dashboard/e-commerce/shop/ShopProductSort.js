import { Icon } from '@iconify/react';
import { useState } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// redux
// import { useDispatch } from 'src/___redux/slices/product___redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { sortByProducts } from 'src/___redux/slices/product';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'miles', label: 'Miles on Odometer' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

function renderLabel(label) {
  if (label === 'popularity') {
    return 'Popularity';
  }
  if (label === 'miles') {
    return 'Miles on Odometer';
  }
  if (label === 'newest') {
    return 'Newest';
  }
  if (label === 'priceDesc') {
    return 'Price: High-Low';
  }
  if (label === 'priceAsc') {
    return 'Price: Low-High';
  }
}

export default function ShopProductSort() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const { sortBy } = useSelector((state) => state.product);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSortBy = (value) => {
    handleClose();
    dispatch(sortByProducts(value));
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {renderLabel(sortBy)}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortBy}
            onClick={() => handleSortBy(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
