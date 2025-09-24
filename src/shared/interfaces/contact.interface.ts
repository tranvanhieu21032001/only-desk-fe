import { LastConversations } from "./conversation.interface";

export enum ContactGender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface ContactContext {
  ip?: string;
  countryCode?: string;
  countryName?: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  browser?: string;
  os?: string;
  language?: string;
}

export interface CompanyInfo {
  company?: string;
  jobTitle?: string;
  jobRole?: string;
  website?: string;
  city?: string;
  country?: string;
  employees?: number;
}

export interface Contact {
  id: string;
  rawId?: string;
  createdAt?: string;
  updatedAt?: string;
  guestId?: string;
  name?: string;
  gender?: ContactGender;
  email?: string;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  website?: string;
  notification?: boolean;
  lastConversations?: LastConversations;
  segments: string[];
  metadata?: {
    [key: string]: any;
  };
  notes?: string;
  isOnline: boolean;
  lastActivityAt?: string;
  workspaceId?: string;
  context?: ContactContext;
  companyInfo?: CompanyInfo;
}