import { paths } from './routes/paths';

export const PATH_AFTER_LOGIN = paths.auth.jwt.login;
export const PATH_DASHBOARD = paths.dashboard.root;
export const PATH_MAP4D = paths.map4d.root;
export const PATH_ROOT = paths.home.root;

export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
export const CESIUM_DEFAULT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_CESIUM_DEFAULT_ACCESS_TOKEN ?? '';
