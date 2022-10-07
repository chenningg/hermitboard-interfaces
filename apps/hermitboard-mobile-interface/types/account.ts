import { AuthRoleValue } from "./auth-role";
import { AuthTypeValue } from "./auth-type";

export type Account = {
  id: string;
  nickname: string;
  email: string;
  emailConfirmed: boolean;
  passwordUpdatedAt: Date;
  authType: AuthTypeValue;
  authRoles: AuthRoleValue[];
};
