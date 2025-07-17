import { TFunction } from 'i18next';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  ContactInterface,
  ContactsInitialStateInterface,
} from '../../models/contacts.model';
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

const initialState: ContactsInitialStateInterface = {
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
};

const createContact = createAsyncThunk(
  'contacts/create-contact',
  async (values: { email: string; name: string; t: TFunction }, { dispatch }) => {
    const { email, name, t } = values;

    const result = await postRequest(endpointContact.CREATE_CONTACT, {
      data: { ...(email && { email }), ...(name && { name }) },
      messageSuccess: t('create-contact.create-contact-success'),
    });
    await dispatch(fetchContacts({ offset: 0 }));
    return result;
  },
);

const fetchContacts = createAsyncThunk(
  'contacts/get-contacts',
  async (values: { offset?: number; keyword?: string | null } = {}) => {
    const { offset, keyword } = values;

    const results = await fetchQuery<ContactsQuery>(
      relayEnvironment,
      contactsQuery,
      {
        args: { first: PAGE_SIZE, offset: offset ?? PAGE },
        keyword: keyword ?? null,
      },
      { fetchPolicy: 'network-only' },
    ).toPromise();
    return results?.contacts;
  },
);

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
        edges?.map((contact: { node: ContactInterface }) => contact?.node) || [];
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
} = slice.actions;

export {
  createContact,
  fetchContacts,
  handleRemoveContactAction,
  fetchDetailsContact,
  fetchUserProfileCard,
  fetchContactProfileCard,
};

export default slice.reducer;
