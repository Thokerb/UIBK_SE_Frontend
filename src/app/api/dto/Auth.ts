export interface Credentials {
  username: string;
  password: string;
}

export interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  responseType: string;
}

export enum REGISTER_STATUS {
  'USERCREATED',
  'USEREXISTS',
  'EMAILEXISTS'
}
