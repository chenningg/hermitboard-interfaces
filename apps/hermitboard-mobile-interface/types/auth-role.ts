enum AuthRoleValue {
  Demo = "DEMO",
  Free = "FREE",
  Plus = "PLUS",
  Pro = "PRO",
  Enterprise = "ENTERPRISE",
  Support = "SUPPORT",
  Admin = "ADMIN",
  SuperAdmin = "SUPER_ADMIN",
}

type AuthRole = {
  id: string;
  value: AuthRoleValue;
  description?: string;
};
