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
