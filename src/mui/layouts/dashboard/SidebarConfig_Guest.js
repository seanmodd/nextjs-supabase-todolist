// routes
import { PATH_DASHBOARD } from 'src/mui/routes/paths';
// components
import SvgIconStyle from 'src/otherComponents/components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: '100%', height: '100%' }}
  />
);
const myIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/${name}.svg`}
    sx={{ width: '100%', height: '100%' }}
  />
);

const ICONS = {
  user: getIcon('ic_user'),
  carfax: getIcon('carfax'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  mail: getIcon('ic_mail'),
  blog: getIcon('ic_blog'),
  booking: getIcon('ic_booking'),
  chat: getIcon('ic_chat'),
  danger: myIcon('_danger-14'),
  user8: myIcon('_user-8'),
  user28: myIcon('_user-28'),
  smiley8: myIcon('_smiley-8'),
  car4: myIcon('_car-4'),
  noun_newcar: myIcon('noun_new-car'),
  noun_cleancar: myIcon('noun_cleancar'),
  noun_sell: myIcon('noun_sell'),
  noun_checkout: myIcon('noun_checkout'),
  noun_checkout2: myIcon('noun_checkout2'),
  like: myIcon('heart_filled'),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'View All',
        path: '/dashboard/shop',
        icon: ICONS.dashboard,
      },
      {
        title: 'Trade-In Value',
        path: '/dashboard/carfax-value',
        icon: ICONS.noun_checkout,
      },
      {
        title: 'Message Us',
        path: PATH_DASHBOARD.mail.all,
        icon: ICONS.chat,
      },
    ],
  },

  {
    subheader: 'More',
    items: [
      {
        title: 'Profile',
        path: PATH_DASHBOARD.user.pageRegister,
        icon: ICONS.smiley8,
      },
      {
        title: 'Sell',
        path: PATH_DASHBOARD.user.pageRegister,
        icon: ICONS.noun_checkout,
      },
      {
        title: 'Login',
        path: PATH_DASHBOARD.user.pageLogin,
        icon: ICONS.smiley8,
      },
      {
        title: 'Register',
        path: PATH_DASHBOARD.user.pageRegister,
        icon: ICONS.user8,
      },
    ],
  },
];

export default sidebarConfig;
