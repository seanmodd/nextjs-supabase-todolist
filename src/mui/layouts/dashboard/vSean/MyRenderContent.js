//* Account important!
import useAuth from 'src/mui/hooks/useAuth';
import { useEffect } from 'react';
// next
import { Link as NextLink } from 'next';
import { useRouter } from 'next/router';
// material
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';
// hooks
import MyAvatar from 'src/mui/components/MyAvatar';
import useCollapseDrawer from 'src/mui/hooks//useCollapseDrawer';
// components
import Logo from 'src/mui/components/Logo';
import Scrollbar from 'src/mui/components/Scrollbar';
import NavSection from 'src/mui/components/NavSection';
//
import { MHidden } from 'src/mui/components/@material-extend';
import sidebarConfigAuthenticated from '../SidebarConfig_Authenticated';
import sidebarConfigGuest from '../SidebarConfig_Guest';

// ----------------------------------------------------------------------

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

export function MyRenderContent({ MyIconCollapse }) {
  const { pathname } = useRouter();
  const { user, isAuthenticated } = useAuth();

  const endlink = !isAuthenticated
    ? '/dashboard/user/register'
    : 'dashboard/shop';
  const { isCollapse, collapseClick, onToggleCollapse } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
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
              <MyIconCollapse
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
}
