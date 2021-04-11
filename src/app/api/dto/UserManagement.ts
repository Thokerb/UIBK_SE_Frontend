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

export interface DeleteUserResponse { }

export interface UpdateUserRequest{
  enabled: boolean;
  roles: USER_ROLES[];
}
