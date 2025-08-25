export interface User {
  id: string;
  rawId?: string;
  email?: string;
  role?: string[];
  avatar?: string;
  isVerified?: boolean;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  status?: string;
  isOnline?: boolean;
  lastActivityAt?: string;
}
