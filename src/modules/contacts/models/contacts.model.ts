import { Contact } from '@/shared/interfaces/contact.interface';

export interface ContactsInitialStateInterface {
  isLoading?: boolean;
  contacts?: Contact[];
  totalDocs?: number;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  contactDetails: Contact | null;
  isDetails: boolean;
  metadata: {
    key: string;
    value: string;
  }[];
  userProfile: any | null;
  contactProfile: any | null;
}

export interface ResultFetchContactsInterface {
  contacts: {
    edges: {
      node: Contact;
    };
    totalDocs: number;
  };
}
