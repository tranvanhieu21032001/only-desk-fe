import { TFunction } from 'i18next';
import { fetchQuery } from 'relay-runtime';
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
import { deleteRequest, postRequest } from '@/core/services/requests';
import { ContactsQuery } from '@/relay/__generated__/ContactsQuery.graphql';
import { ContactDetailsQuery } from '@/relay/__generated__/ContactDetailsQuery.graphql';

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
};

const createContact = createAsyncThunk(
  'contacts/create-contact',
  async (values: { email: string; name: string; t: TFunction }) => {
    const { email, name, t } = values;
    const results = await postRequest(endpointContact?.CREATE_CONTACT, {
      data: {
        ...(email && { email }),
        ...(name && { name }),
      },
      messageSuccess: t('create-contact.create-contact-success'),
    });

    return results;
  },
);

const fetchContacts = createAsyncThunk(
  'contacts/get-contacts',
  async (values: { workspaceId: string; offset?: number }) => {
    const { workspaceId, offset } = values;

    const results: any = await fetchQuery<ContactsQuery>(
      relayEnvironment,
      contactsQuery,
      {
        workspaceId: workspaceId,
        args: { first: PAGE_SIZE, offset: offset || PAGE },
      },
      { fetchPolicy: 'network-only' },
    ).toPromise();

    return results?.contacts;
  },
);

const handleRemoveContactAction = createAsyncThunk(
  'contacts/remove-contact',
  async (
    values: {
      workspaceId: string;
      id: string;
      t: TFunction;
    },
    { dispatch },
  ) => {
    const { workspaceId, id, t } = values;
    const result = await deleteRequest(
      endpointContact?.REMOVE_CONTACT?.replace(':id', id),
      {
        messageSuccess: t('remove-contact-success'),
      },
    );

    if (result) {
      await dispatch(fetchContacts({ workspaceId }));
    }

    return workspaceId;
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
    //Get contacts
    builder.addCase(fetchContacts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action: any) => {
      const pageInfo = action.payload?.pageInfo || {};
      const edges = action.payload?.edges || [];

      state.isLoading = false;
      state.contacts =
        edges?.map((contact: { node: ContactInterface }) => contact?.node) ||
        [];
      state.totalDocs = action.payload?.totalCount || 0;
      state.pageInfo = action.payload?.pageInfo || {
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

    //Create contact
    builder.addCase(createContact.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createContact.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.contacts = [
        action.payload,
        ...((state?.contacts?.length || 0) + 1 < PAGE_SIZE
          ? state?.contacts || []
          : (state?.contacts || [])?.slice(0, -1)),
      ];
      state.totalDocs = (state.totalDocs || 0) + 1;
    });
    builder.addCase(createContact.rejected, (state) => {
      state.isLoading = false;
      state.contacts = [];
    });

    //Remove contact
    builder.addCase(handleRemoveContactAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      handleRemoveContactAction.fulfilled,
      (state, action: any) => {
        state.isLoading = false;
        state.totalDocs =
          action.payload?.totalDocs === 0 ? 0 : action.payload?.totalDocs - 1;
      },
    );
    builder.addCase(handleRemoveContactAction.rejected, (state) => {
      state.isLoading = false;
    });

    //Get details contact
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
};

export default slice.reducer;
