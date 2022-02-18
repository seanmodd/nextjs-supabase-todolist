//* Account Credentials Stuff
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useRef, useState, useEffect } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import userLock from '@iconify/icons-fa-solid/user-lock';
// next

// import { Link as RouterLink } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
// material
import { alpha } from '@mui/material/styles';
import {
  Box,
  Avatar,
  Button,
  Divider,
  Link as MuiLink,
  MenuItem,
  Typography,
} from '@mui/material';
// components
import { PATH_DASHBOARD } from 'src/mui/routes/paths';
import MenuPopover from 'src/mui/components/MenuPopover';
import { MIconButton } from 'src/mui/components//@material-extend';
import useAuth from 'src/mui/hooks/useAuth';
import useIsMountedRef from 'src/mui/hooks/useIsMountedRef';
import MyAvatar from 'src/mui/components//MyAvatar';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'View All',
    icon: homeFill,
    theHref: '/dashboard/shop',
  },
  {
    label: 'Profile',
    icon: personFill,
    theHref: PATH_DASHBOARD.user.profile,
  },
  {
    label: 'Account Settings',
    icon: settings2Fill,
    theHref: PATH_DASHBOARD.user.account,
  },
];
const LOCK_MENU_OPTIONS = [
  {
    label: 'View All',
    icon: homeFill,
    theHref: '/dashboard/shop',
  },
  {
    label: 'Profile',
    icon: userLock,
    theHref: '/dashboard/user/register',
  },
  {
    label: 'Account Settings',
    icon: userLock,
    theHref: '/dashboard/user/register',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const { user, logout, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/dashboard/shop');
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };
  const handleRegister = async () => {
    try {
      await null;
      router.push('/dashboard/user/register');
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to navigate to register page!', {
        variant: 'error',
      });
    }
  };
  const handleLogin = async () => {
    try {
      await null;
      router.push('/dashboard/user/login');
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to navigate to login page!', {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        {/* <Avatar
          alt="My Avatar"
          src="/static/mock-images/avatars/avatar_default.jpg"
        /> */}
        <MyAvatar />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {/* {user.displayName} */}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {user.email} */}
          </Typography>
        </Box>
        {!isAuthenticated && (
          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button
              href="/dashboard/user/register"
              component={MuiLink}
              onClick={handleClose}
              fullWidth
              color="inherit"
              variant="outlined"
            >
              Quick Register Now!
            </Button>
          </Box>
        )}

        <Divider sx={{ my: 1 }} />

        {isAuthenticated &&
          MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              href={option.theHref}
              component={MuiLink}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
          ))}
        {!isAuthenticated &&
          LOCK_MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              href={option.theHref}
              component={MuiLink}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
          ))}
        {/* {MENU_OPTIONS.map((option) => (
          <RouterLink key={option.label} href={option.linkTo}>
            <MenuItem
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
          </RouterLink>
        ))} */}
        {!isAuthenticated && (
          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        )}

        {isAuthenticated && (
          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </MenuPopover>
    </>
  );
}
