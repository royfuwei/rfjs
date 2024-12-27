const ROOTS = {
  HOME: '/home',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  MAP4D: '/map4d',
};

export const paths = {
  uri: '',
  home: {
    root: ROOTS.HOME,
  },
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
    },
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
  map4d: {
    root: '/map4d',
  },
};
