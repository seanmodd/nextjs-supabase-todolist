// next
import Link from 'next/link';
import { useRouter } from 'next/router';
// material
import { styled } from '@mui/material/styles';
import {
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
// hooks
import { useTheme } from '@mui/material/styles';
import useOffSetTop from 'src/mui/hooks//useOffSetTop';
// components
import Logo from 'src/mui/components/Logo';
import Label from 'src/mui/components/Label';
import { MHidden } from 'src/mui/components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;
// const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const isOffset = useOffSetTop(100);
  // const { pathname } = useRouter()
  //! New for gatsby configuration
  // const [activePathname, setActivePathname] = useState('');

  const router = useRouter();
  const activePathname = router.asPath;

  // const isHome = pathname === '/'
  const isHome = activePathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 },
          }),
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/">
            <Logo />
          </Link>
          <Label
            sx={{
              fontFamily: 'Barlow',
              backgroundColor: PRIMARY_LIGHT,
              color: '#000000',
              ml: 1,
              pb: 1,
              pt: 0.75,
            }}
          >
            CarX
          </Label>
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
          <Button
            style={{
              textColor: '#ffff',
              fontColor: '#fff',
              color: '#fff',
            }}
            variant="contained"
            target="_blank"
          >
            <Link
              style={{
                textColor: '#ffff',
                fontColor: '#fff',
                color: '#fff',
              }}
              href="/dashboard/home"
            >
              <Typography
                sx={{ fontFamily: 'barlow', color: '#FFF', fontWeight: 600 }}
              >
                {' '}
                Get Started{' '}
              </Typography>
            </Link>
          </Button>

          <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
