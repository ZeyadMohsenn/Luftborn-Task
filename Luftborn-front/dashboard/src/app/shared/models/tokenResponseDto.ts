export interface TokenResponseDto {
  token: string;
  user: CurrentUser;
  expiration: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  role: string;
  permissions: string[];
}
