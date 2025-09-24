import { TFunction } from 'i18next';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ContactsInitialStateInterface } from '../../models/contacts.model';
import { PAGE, PAGE_SIZE } from '@/shared/constant/common';
import { contactsQuery } from '@/relay/ContactsQuery';
import relayEnvironment from '@/relay/RelayEnvironment';
import { endpointContact } from '../../api/contacts.api';
import { contactDetailsQuery } from '@/relay/ContactDetailsQuery';
import { userProfileCardQuery } from '@/relay/UserProfileCardQuery';
import { contactProfileCardQuery } from '@/relay/ContactProfileCardQuery';
import { deleteRequest, postRequest } from '@/core/services/requests';
import { ContactsQuery } from '@/relay/__generated__/ContactsQuery.graphql';
import { ContactDetailsQuery } from '@/relay/__generated__/ContactDetailsQuery.graphql';
import { UserProfileCardQuery } from '@/relay/__generated__/UserProfileCardQuery.graphql';
import { ContactProfileCardQuery } from '@/relay/__generated__/ContactProfileCardQuery.graphql';
import { fetchQuery } from 'react-relay';
import { Contact } from '@/shared/interfaces/contact.interface';

interface ContactsSearchState {
  searchResults: Contact[];
  searchLoading: boolean;
  searchError: string | null;
  searchOffset: number;
  hasMore: boolean;
}

const initialState: ContactsInitialStateInterface & ContactsSearchState = {
  isLoading: false,
  contacts: [],
  totalDocs: 0,
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: '',
    endCursor: '',
  },
  contactDetails: null,
  isDetails: true,
  metadata: [],
  userProfile: null,
  contactProfile: null,

  searchResults: [],
  searchLoading: false,
  searchError: null,
  searchOffset: 0,
  hasMore: true,
};

const createContact = createAsyncThunk(
  'contacts/create-contact',
  async (
    values: { email: string; name: string; t: TFunction },
    { dispatch },
  ) => {
    const { email, name, t } = values;

    const result = await postRequest(endpointContact.CREATE_CONTACT, {
      data: { ...(email && { email }), ...(name && { name }) },
      messageSuccess: t('create-contact.create-contact-success'),
    });
    await dispatch(fetchContacts({ offset: 0 }));
    return result;
  },
);

type FetchContactsParams = {
  keyword?: string | null;
  offset?: number;
  fetchPolicy?: 'store-or-network' | 'network-only';
  mapEdges?: boolean;
};

async function getContacts({
  keyword = null,
  offset = 0,
  fetchPolicy = 'store-or-network',
  mapEdges = false,
}: FetchContactsParams): Promise<{ contacts: Contact[] } | any> {
  const results = await fetchQuery<ContactsQuery>(
    relayEnvironment,
    contactsQuery,
    {
      args: { first: PAGE_SIZE, offset },
      keyword,
    },
    { fetchPolicy },
  ).toPromise();

  if (!results?.contacts) return null;

  if (mapEdges) {
    const contacts = results.contacts.edges?.map((edge) => edge?.node as Contact) || [];
    return { contacts };
  }
  return results.contacts;
}


 const fetchContacts = createAsyncThunk(
  'contacts/get-contacts',
  async (values: { offset?: number; keyword?: string | null } = {}) => {
    return getContacts({
      keyword: values.keyword ?? null,
      offset: values.offset ?? PAGE,
      fetchPolicy: 'store-or-network',
      mapEdges: false,
    });
  },
);

 const fetchSearchContacts = createAsyncThunk<
  { contacts: Contact[] },
  { keyword: string; offset?: number },
  { rejectValue: string }
>('contacts/search-contacts', async (values, { rejectWithValue }) => {
  try {
    const data = await getContacts({
      keyword: values.keyword,
      offset: values.offset ?? 0,
      fetchPolicy: 'network-only',
      mapEdges: true,
    });

    if (!data) return rejectWithValue('No data found');

    return data; // { contacts: Contact[] }
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to search contacts');
  }
});

const handleRemoveContactAction = createAsyncThunk(
  'contacts/remove-contact',
  async (values: { ids: string[]; t: TFunction }, { dispatch }) => {
    const { ids, t } = values;

    const ok = await deleteRequest(endpointContact.REMOVE_CONTACT, {
      data: { contactIds: ids },
      messageSuccess: t('remove-contact-success', { count: ids.length }),
    });

    if (ok) await dispatch(fetchContacts({ offset: 0 }));
    return ids;
  },
);

const fetchDetailsContact = createAsyncThunk(
  'contacts/get-details-contact',
  async (values: { idContact: string }) => {
    const { idContact } = values;

    const results = await fetchQuery<ContactDetailsQuery>(
      relayEnvironment,
      contactDetailsQuery,
      {
        id: idContact,
      },
      { fetchPolicy: 'network-only' },
    ).toPromise();

    return results?.node || {};
  },
);

const fetchUserProfileCard = createAsyncThunk(
  'contacts/fetch-user-profile-card',
  async (values: { id: string }) => {
    const { id } = values;

    const results = await fetchQuery<UserProfileCardQuery>(
      relayEnvironment,
      userProfileCardQuery,
      { id },
      { fetchPolicy: 'network-only' },
    ).toPromise();

    return results?.node || null;
  },
);

const fetchContactProfileCard = createAsyncThunk(
  'contacts/fetch-contact-profile-card',
  async (values: { id: string }) => {
    const { id } = values;
    const results = await fetchQuery<ContactProfileCardQuery>(
      relayEnvironment,
      contactProfileCardQuery,
      { id },
      { fetchPolicy: 'network-only' },
    ).toPromise();

    return results?.node || null;
  },
);

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    actionUpdateIsDetails: (state, action) => {
      state.isDetails = action.payload;
    },
    actionUpdateIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    actionUpdateContactDetails: (state, action) => {
      state.contactDetails = action.payload;
    },
    resetSearchContacts: (state) => {
      state.searchResults = [];
      state.searchLoading = false;
      state.searchError = null;
      state.searchOffset = 0;
      state.hasMore = true;
    }
  },

  extraReducers: (builder) => {
    // Get contacts
    builder.addCase(fetchContacts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action: any) => {
      const pageInfo = action.payload?.pageInfo || {};
      const edges = action.payload?.edges || [];

      state.isLoading = false;
      state.contacts =
        edges?.map((contact: { node: Contact }) => contact?.node) || [];
      state.totalDocs = action.payload?.totalCount || 0;
      state.pageInfo = {
        hasNextPage: pageInfo?.hasNextPage || false,
        hasPreviousPage: pageInfo?.hasPreviousPage || false,
        startCursor: pageInfo?.startCursor || '',
        endCursor: pageInfo?.endCursor || '',
      };
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.isLoading = false;
      state.contacts = [];
    });

    builder.addCase(fetchSearchContacts.pending, (state, action) => {
      if (action.meta.arg.offset === 0) {
        state.searchLoading = true;
      }
      state.searchError = null;
    });
    builder.addCase(fetchSearchContacts.fulfilled, (state, action: any) => {
      const { contacts } = action.payload;
      state.searchLoading = false;
      
      const isInitialSearch = action.meta.arg.offset === 0;
      if (isInitialSearch) {
        state.searchResults = contacts;
      } else {
        state.searchResults.push(...contacts);
      }
      
      state.searchOffset = state.searchOffset + PAGE_SIZE;
      state.hasMore = contacts.length === PAGE_SIZE;
    });
    builder.addCase(fetchSearchContacts.rejected, (state, action) => {
      state.searchLoading = false;
      state.searchResults = [];
      state.searchError = action.payload || 'Failed to search contacts';
      state.hasMore = false;
    });

    // Create contact
    builder.addCase(createContact.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createContact.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createContact.rejected, (state) => {
      state.isLoading = false;
      state.contacts = [];
    });

    // Remove contact
    builder.addCase(handleRemoveContactAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleRemoveContactAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(handleRemoveContactAction.rejected, (state) => {
      state.isLoading = false;
    });

    // Get details contact
    builder.addCase(fetchDetailsContact.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDetailsContact.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.contactDetails = action.payload || null;
    });
    builder.addCase(fetchDetailsContact.rejected, (state) => {
      state.isLoading = false;
      state.contactDetails = null;
    });

    // User Profile
    builder.addCase(fetchUserProfileCard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserProfileCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload;
    });
    builder.addCase(fetchUserProfileCard.rejected, (state) => {
      state.isLoading = false;
      state.userProfile = null;
    });

    // Contact Profile
    builder.addCase(fetchContactProfileCard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContactProfileCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contactProfile = action.payload;
    });
    builder.addCase(fetchContactProfileCard.rejected, (state) => {
      state.isLoading = false;
      state.contactProfile = null;
    });
  },
});

export const {
  actionUpdateIsDetails,
  actionUpdateIsLoading,
  actionUpdateContactDetails,
  resetSearchContacts,
} = slice.actions;

export {
  createContact,
  fetchContacts,
  fetchSearchContacts,
  handleRemoveContactAction,
  fetchDetailsContact,
  fetchUserProfileCard,
  fetchContactProfileCard,
};

export default slice.reducer;