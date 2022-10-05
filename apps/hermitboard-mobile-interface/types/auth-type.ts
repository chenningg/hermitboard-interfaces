enum AuthTypeValue {
  Local = "LOCAL",
  Google = "GOOGLE",
  Facebook = "FACEBOOK",
  Apple = "APPLE",
}

type AuthType = {
  id: string;
  value: AuthTypeValue;
  description?: string;
};
