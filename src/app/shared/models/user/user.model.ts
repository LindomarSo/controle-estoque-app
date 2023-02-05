import { UserRole } from './userRole';
export interface User {
  id: number;
  userName: string;
  nomeCompleto: string;
  email: string;
  phoneNumber: string;
  password: string;
  token: string;

  userRoles: UserRole[];
}
