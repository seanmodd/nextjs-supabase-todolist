import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  Autocomplete,
  TextField,
} from '@mui/material';
// components
import { MIconButton } from 'src/mui/components/@material-extend';
import { Chip, Paper } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { paramCase } from 'change-case';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
// const APPBAR_DESKTOP = 64;
const APPBAR_DESKTOP = 88;
// const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const router = useRouter();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSearchResult = (value) => {
    axios
      .get(`https://api.shopcarx.com/variants?_q=${value}`)
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((err) => console.log(err));
  };

  const redirectToDetails = (event, value) => {
    router.push(
      `/dashboard/shop/${paramCase(value.car_make_name)}/${value.id}`
    );
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <MIconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </MIconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <InputAdornment position="start">
              <Box
                component={Icon}
                icon={searchFill}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
            <Autocomplete
              style={{ width: '100%' }}
              freeSolo
              size="small"
              disablePortal
              popupIcon={null}
              onChange={redirectToDetails}
              options={searchResult}
              getOptionLabel={(option) =>
                `${option.car_make_name} - ${option.car_name} ( year: ${
                  option.year
                } ${option.price > 0 ? `, price: ${option.price}` : ` `})`
              }
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  placeholder="Search ..."
                  {...params}
                  onChange={(e) => getSearchResult(e.target.value)}
                  variant="standard"
                />
              )}
            />

            <Button
              variant="contained"
              onClick={handleClose}
              style={{ marginLeft: '30px' }}
            >
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}

export default Searchbar;

// export const getServerSideProps = wrapperStore.getServerSideProps(
//   (store) =>
//     async ({ params }) => {
//       await store.dispatch(getVariants());
//       const redux_store = store.getState();
//       return {
//         props: {
//           initialReduxState: redux_store,
//         },
//       };
//     }
// );

// export default Searchbar;
