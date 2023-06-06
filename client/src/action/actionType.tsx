export type TypeRegisterData = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};
export type TypeLoginData = {
  email: string;
  password: string;
};
export type TypeTokenData = {
  name: string;
  id: string;
  exp: Number;
  iat: Number;
};
