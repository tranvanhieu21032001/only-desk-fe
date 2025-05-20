export interface UserInforInterface {
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
}

export interface WorkSpaceInterface {
  id: string;
  logo: string;
  name: string;
  websiteID: string;
  websiteUrl: string;
}
