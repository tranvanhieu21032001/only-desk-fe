interface Owner {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Workspace {
  _id: string;
  name: string;
  websiteUrl: string;
  websiteID: string;
  status: 'draft' | 'pending' | 'installed' | 'closed';
  plan: 'free' | 'mini' | 'essentials' | 'plus';
  owner: Owner;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
