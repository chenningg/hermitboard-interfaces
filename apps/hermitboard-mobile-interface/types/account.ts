type Account = {
  id: string;
  nickname: string;
  email: string;
  emailConfirmed: boolean;
  passwordUpdatedAt: Date;
  authType: AuthType;
  authRoles: AuthRole[];
};
