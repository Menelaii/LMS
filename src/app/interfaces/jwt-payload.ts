export interface JwtPayload {
  sub: string;
  username: string;
  role: string;
  iat: number;
  iss: string;
  exp: number;
}
