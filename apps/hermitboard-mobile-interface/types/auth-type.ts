export enum AuthTypeValue {
  Local = "LOCAL",
  Google = "GOOGLE",
  Facebook = "FACEBOOK",
  Apple = "APPLE",
}

export type AuthType = {
  id: string;
  value: AuthTypeValue;
  description?: string;
};
