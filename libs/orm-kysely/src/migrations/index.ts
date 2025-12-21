import * as CreateUser from './2021_09_18_06_54_59_create_user';
import * as CreateRefreshToken from './2021_09_18_14_05_20_create_refresh_token';
import * as CreateSignInMethod from './2021_09_18_18_22_45_create_sign_in_method';

import { Migration } from 'kysely';

export const migrations: Record<string, Migration> = {
  '2021_09_18_06_54_59_create_user': CreateUser,
  '2021_09_18_14_05_20_create_refresh_token': CreateRefreshToken,
  '2021_09_18_18_22_45_create_sign_in_method': CreateSignInMethod,
};
