export interface GetUserResponse {
  user: User;
}

export interface GetAllUserResponse {
  user: User[];
}

export interface User {
  username: string;
  email: string;
  enabled: boolean;
  roles: USER_ROLES[];
  id: string;
}

export enum USER_ROLES {
  PLAYER,
  ORGANIZER,
  ADMIN,
}
