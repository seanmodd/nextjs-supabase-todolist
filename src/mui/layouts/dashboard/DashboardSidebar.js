//* Account important!
import useAuth from 'src/mui/hooks/useAuth';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
// next
import { Link as NextLink } from 'next';
import { useRouter } from 'next/router';

// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Avatar,
  Drawer,
  Tooltip,
  Typography,
  CardActionArea,
} from '@mui/material';
// hooks
import MyAvatar from 'src/mui/components/MyAvatar';
import useCollapseDrawer from 'src/mui/hooks//useCollapseDrawer';
// components
import Logo from 'src/mui/components/Logo';
import Scrollbar from 'src/mui/components/Scrollbar';
import NavSection from 'src/mui/components/NavSection';
//
import { MHidden } from 'src/mui/components/@material-extend';
import sidebarConfigAuthenticated from './SidebarConfig_Authenticated';
import sidebarConfigGuest from './SidebarConfig_Guest';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex,
    }),
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

IconCollapse.propTypes = {
  onToggleCollapse: PropTypes.func,
  collapseClick: PropTypes.bool,
};

function IconCollapse({ onToggleCollapse, collapseClick }) {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '50%',
          alignItems: 'center',
          color: 'text.primary',
          justifyContent: 'center',
          border: 'solid 1px currentColor',
          ...(collapseClick && {
            borderWidth: 2,
          }),
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            transition: (theme) => theme.transitions.create('all'),
            ...(collapseClick && {
              width: 0,
              height: 0,
            }),
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useRouter();
  const { user, isAuthenticated } = useAuth();
  const theAuth = useAuth();

  const endlink = !isAuthenticated
    ? '/dashboard/user/register'
    : 'dashboard/shop';
  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center',
          }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <NextLink href="/">
            <Box sx={{ display: 'inline-flex' }}>
              <Logo />
            </Box>
          </NextLink>

          <MHidden width="lgDown">
            {!isCollapse && (
              <IconCollapse
                onToggleCollapse={onToggleCollapse}
                collapseClick={collapseClick}
              />
            )}
          </MHidden>
        </Stack>
        {isCollapse ? (
          <MyAvatar />
        ) : (
          <NextLink href={endlink}>
            {/* <NextLink href="#"> */}
            <AccountStyle>
              {/* <Avatar
                alt='My Avatar'
                src='/static/mock-images/avatars/avatar_default.jpg'
              /> */}
              <MyAvatar />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {/* {(isAuthenticated && user.displayName) || user.email} */}
                  {!isAuthenticated && 'Guest User'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {!isAuthenticated && 'Not signed in yet'}
                </Typography>
              </Box>
            </AccountStyle>
          </NextLink>
        )}
       
      </Stack>
      {isAuthenticated && (
        <NavSection
          navConfig={sidebarConfigAuthenticated}
          isShow={!isCollapse}
        />
      )}
      {!isAuthenticated && (
        <NavSection navConfig={sidebarConfigGuest} isShow={!isCollapse} />
      )}
    </Scrollbar>
  );
// THIS IS THE ANNOYING BUG
  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) =>
                  alpha(theme.palette.background.default, 0.88),
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

    </RootStyle>
  );
}
