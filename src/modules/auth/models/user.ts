export interface UserInforInterface {
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
}

export interface WorkspaceInterface {
  id: string;
  rawId: string;
  logo: string;
  name: string;
  websiteID: string;
  websiteUrl: string;
  contactEmail?: string;
  contactPhone?: string;
  metadata?: [{ [key: string]: string }];
}
