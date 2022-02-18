import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { noCase, paramCase } from 'change-case';
import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import heartFill from '@iconify/icons-eva/heart-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
// next
import NextLink from 'next/link';
// material
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
// components
import Scrollbar from 'src/mui/components/Scrollbar';
import MenuPopover from 'src/mui/components/MenuPopover';
import { MIconButton } from 'src/mui/components/@material-extend';
import { USER_DATA, USER_FAVORITE_DATA } from 'src/utils/callbacks';

import styles from 'styles/Home.module.css';
import { styled } from '@material-ui/core';
import { useRouter } from 'next/router';
import { getFavoriteList } from 'src/utils/localstorage';
import useAuth from 'src/mui/hooks/useAuth';
import mockData from 'src/mui/utils/mock-data';

// ----------------------------------------------------------------------

const TITLES = [
  'Your order is placed',
  'Sylvan King',
  'You have new message',
  'You have new mail',
  'Delivery processing',
];

const DESCRIPTIONS = [
  'waiting for shipping',
  'answered to your comment on the Minimal',
  '5 unread messages',
  'sent from Guido Padberg',
  'Your order is being shipped',
];

const TYPES = [
  'order_placed',
  'friend_interactive',
  'chat_message',
  'mail',
  'order_shipped',
];

const AVATARS = [null, mockData.image.avatar(2), null, null, null];

const UNREADS = [true, true, false, false, false];

const MOCK_NOTIFICATIONS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  title: TITLES[index],
  description: DESCRIPTIONS[index],
  avatar: AVATARS[index],
  type: TYPES[index],
  createdAt: mockData.time(index),
  isUnRead: UNREADS[index],
}));

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: 'text.secondary' }}
      >
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title,
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

function NotificationItem({ notification }) {
  const { avatar } = renderContent(notification);
  const { title } = renderContent(notification);

  return (
    <NextLink href="#">
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          ...(notification.isUnRead && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              <Box
                component={Icon}
                icon={clockFill}
                sx={{ mr: 0.5, width: 16, height: 16 }}
              />
              {formatDistanceToNow(new Date(notification.createdAt))}
            </Typography>
          }
        />
      </ListItemButton>
    </NextLink>
  );
}

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  const { isAuthenticated } = useAuth();

  const [userData] = USER_DATA.useSharedState();
  const [favouriteData] = USER_FAVORITE_DATA.useSharedState();
  const [favoriteList, setFavoriteList] = useState([]);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log('NotificationsPopover.js	219	called');
    if (isAuthenticated) {
      if (userData) {
        favouriteData?.forEach((product, fIndex) => {
          userData.forEach((favorite, vIndex) => {
            if (product.id === favorite.variant) {
              product.favoriteId = favorite.id;
            }
          });
        });

        const myArrayFiltered = favouriteData?.filter((product) =>
          userData.some((favorite) => favorite.variant === product.id)
        );
        // setFavouriteData(myArrayFiltered);
        setFavoriteList(myArrayFiltered);
      }
    } else {
      const localFavData = getFavoriteList();

      favouriteData?.forEach((product, fIndex) => {
        localFavData.forEach((favorite, vIndex) => {
          if (product.id === favorite) {
            product.favoriteId = favorite;
          }
        });
      });

      const myArrayFiltered = favouriteData?.filter((product) =>
        localFavData.some((favorite) => favorite === product.id)
      );
      setFavoriteList(myArrayFiltered);
    }
  }, [userData, favouriteData]);

  const ProductImgStyle = styled('img')({
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  });

  const redirectToDetails = (favItem) => {
    router.push(
      `/dashboard/shop/${paramCase(favItem.car_make_name)}/${favItem.id}`
    );
  };

  const goToFavoritesPage = () => {
    router.push('/dashboard/user/profile');
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
      >
        <Badge badgeContent={favoriteList?.length} color="error">
          <Icon icon={heartFill} width={30} height={0} />
        </Badge>
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <div className={styles.favList}>
          {favoriteList?.length > 0 ? (
            favoriteList?.map((favItem, favIndex) => (
              <div className={styles.cardContainer} key={favIndex} onClick={() => redirectToDetails(favItem)}>
                <ProductImgStyle src={favItem.image_url || favItem.car_imgSrcUrl_1} />
                <div className={styles.details}>
                  <span>{favItem.car_make_name} - {favItem.car_name}</span>
                  <span>{favItem.int_car_views} Views in last 7 Days</span>
                  <span>${favItem.price}</span>
                </div>
              </div>
            )) : <span>0 Favorite Vehicles</span>}
        </div>
        {favoriteList?.length > 0 && (
          <Box sx={{ p: 1 }}>
            <NextLink href="#">
              <Button fullWidth disableRipple onClick={goToFavoritesPage}>
                View All
              </Button>
            </NextLink>
          </Box>
        )}
      </MenuPopover>
    </>
  );
}
