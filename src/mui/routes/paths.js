// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/user';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path('/dashboard/user/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageOne: path(ROOTS_DASHBOARD, '/one'),
    pageShop: path(ROOTS_DASHBOARD, '/shop'),
    pageCheckout: path(ROOTS_DASHBOARD, '/checkout'),

    pageSell: path(ROOTS_DASHBOARD, '/three'),
    pageThree: path(ROOTS_DASHBOARD, '/three'),
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  app: {
    root: path(ROOTS_DASHBOARD, '/app'),
    pageAccount: path(ROOTS_DASHBOARD, '/app/account'),
    pageFive: path(ROOTS_DASHBOARD, '/app/five'),
    pageSix: path(ROOTS_DASHBOARD, '/app/contact'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey'),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    pageLogin: path(ROOTS_DASHBOARD, '/user/login'),
    pageRegister: path(ROOTS_DASHBOARD, '/user/register'),
    pageVerify: path(ROOTS_DASHBOARD, '/user/verify'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account'),
  },
  shop: {
    root: path(ROOTS_DASHBOARD, '/shop'),
    shop: path(ROOTS_DASHBOARD, '/shop/shop'),
    product: path(ROOTS_DASHBOARD, '/shop/product/:name'),
    productById: path(
      ROOTS_DASHBOARD,
      '/shop/product/nike-air-force-1-ndestrukt'
    ),
    list: path(ROOTS_DASHBOARD, '/shop/list'),
    newProduct: path(ROOTS_DASHBOARD, '/shop/product/new'),
    editById: path(
      ROOTS_DASHBOARD,
      '/shop/product/nike-blazer-low-77-vintage/edit'
    ),
    checkout: path(ROOTS_DASHBOARD, '/shop/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/shop/invoice'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(
      ROOTS_DASHBOARD,
      '/blog/post/apply-these-7-secret-techniques-to-improve-event'
    ),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post'),
  },
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};
