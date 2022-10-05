enum AuthTypeValue {
  Local = "LOCAL",
  Google = "GOOGLE",
  Facebook = "FACEBOOK",
  Apple = "APPLE",
}

type AuthType = {
  id: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  value: AuthTypeValue,
  description?: string,
}