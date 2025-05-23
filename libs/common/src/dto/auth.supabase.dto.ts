import { IsEnum, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class AuthSupabaseSignOutBodyDTO {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

export enum EnumAuthSupabaseProvider {
  GOOGLE = 'google',
  GITHUB = 'github',
}

export class AuthSupabaseSignInBodyDTO {
  @IsString()
  @IsEnum(EnumAuthSupabaseProvider)
  provider: string;

  @IsString()
  @JSONSchema({
    example: 'http://localhost:3000',
  })
  redirectTo: string;
}
/**
 * @example
 * #
 * access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6IjhIUE1oeC9ZNDNJVHpLamEiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE0MzIwMjc1LCJpYXQiOjE3MTQzMTY2NzUsImlzcyI6Imh0dHBzOi8vZ3lqZHlzcHBneHl1dWphc3NpZ3Uuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImJjMDJkYzVhLThhZmItNGJjZi1hZDQ5LTVkYzE5YTcwYjUwNCIsImVtYWlsIjoicm95ZnV3ZWlAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJnaXRodWIiLCJwcm92aWRlcnMiOlsiZ2l0aHViIiwiZ29vZ2xlIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhcl91cmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMZ29qYm5FNjlHMGlieTBVSm9LY01aOTgtWVZkV0VjZ0ZiYk1NbW5yNDMxa2JqUEpVZT1zOTYtYyIsImVtYWlsIjoicm95ZnV3ZWlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6InJveSBjaHVhbmciLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoicm95IGNodWFuZyIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xnb2pibkU2OUcwaWJ5MFVKb0tjTVo5OC1ZVmRXRWNnRmJiTU1tbnI0MzFrYmpQSlVlPXM5Ni1jIiwicHJlZmVycmVkX3VzZXJuYW1lIjoicm95ZnV3ZWkiLCJwcm92aWRlcl9pZCI6IjEwMzQzNzA5NzIyNjc4MTMzNTE1NiIsInN1YiI6IjEwMzQzNzA5NzIyNjc4MTMzNTE1NiIsInVzZXJfbmFtZSI6InJveWZ1d2VpIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MTQzMTY2NzV9XSwic2Vzc2lvbl9pZCI6ImIzMzM1ZDlhLWI2YWQtNGZiOS04MDk5LTZmNGE3YWIwMWRjYyIsImlzX2Fub255bW91cyI6ZmFsc2V9.bU9T4hldp3pC5wBLgTotofbTCmUMCPnA6PdEp2cevNM
 * &expires_at=1714320275
 * &expires_in=3600
 * &provider_token=ya29.a0Ad52N38B5BTyVVbNXNLx0IU4X2hUz4nwpmRiImhaYJaWf5nO2MARwSmWYXsq3hCt2aWlAmizh_n4oJc9NvB222ROo9Zy_ka-TsYTMbA4XudL5FI0boPmekaFWxant33A2H7tmVFuNt-XZaJ1JyQNLH14bv7MfDNwXOkaCgYKAb4SARISFQHGX2MibRg5s6SKJRyF_HWVkfNE0w0170
 * &refresh_token=MaSSHVdFezqVAg4f4hOyfw
 * &token_type=bearer
 */
export class AuthSupabaseLoginBodyDTO {
  @IsString()
  accessToken: string;

  @IsString()
  providerToken: string;

  @IsString()
  refreshToken: string;

  @IsString()
  tokenType: string;
}
