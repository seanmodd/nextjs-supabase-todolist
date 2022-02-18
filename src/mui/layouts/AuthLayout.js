import PropTypes from 'prop-types';
import { Link as RouterLink } from 'next';
// material
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// components
import Logo from 'src/mui/components/Logo';
//
import Link from 'next/link';
import { MHidden } from 'src/mui/components/@material-extend';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

// ----------------------------------------------------------------------

AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default function AuthLayout({ children }) {
  return (
    <HeaderStyle>
      <div style={{ marginTop: '100px' }}>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <MHidden width="smDown">
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 },
          }}
        >
          {children}
        </Typography>
      </MHidden>
    </HeaderStyle>
  );
}
