export interface ContactsInitialStateInterface {
  isLoading?: boolean;
  contacts?: ContactInterface[];
  totalDocs?: number;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  contactDetails: ContactInterface | null;
  isDetails: boolean;
  metadata: {
    key: string;
    value: string;
  }[];
}

export interface ContactInterface {
  id: string;
  companyInfo: {
    name: string;
    position: string;
    department: string;
    [key: string]: any;
  };
  context: {
    countryName: string;
    countryCode: string;
    city: string;
    language: string;
  };
  email: string;
  name: string;
  address: string;
  segments: string[];
  lastActivityAt: string;
  avatar?: string;
  [key: string]: any;
}

export interface ResultFetchContactsInterface {
  contacts: {
    edges: {
      node: ContactInterface;
    };
    totalDocs: number;
  };
}
