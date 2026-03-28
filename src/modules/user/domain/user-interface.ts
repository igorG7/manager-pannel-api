type RoleType = "ADMIN" | "OPERATOR" | "SELLER";

export interface IUser {
  name: string;
  email: string;
  role: RoleType;
  password: string;
  active?: boolean;
}
