import { updateRequest } from '@/core/services/requests';
import {
  actionUpdateIsLoading,
  actionUpdateContactDetails,
} from '../store/features/contacts';

const prefixContact: string = '';

const endpointContact = {
  CREATE_CONTACT: `${prefixContact}/contacts`,
  REMOVE_CONTACT: `${prefixContact}/contacts/:id`,
  UPDATE_CONTACT: `${prefixContact}/contacts/:id`,
};

const handleEditProfile = async (
  id: string,
  values: any,
  messageSuccess: string,
  dispatch: any,
) => {
  await updateRequest(endpointContact.UPDATE_CONTACT.replace(':id', id), {
    data: values,
    messageSuccess: messageSuccess,
  })
    .then(() => {
      dispatch(actionUpdateContactDetails(values));
    })
    .finally(() => dispatch(actionUpdateIsLoading(false)));
};

export { endpointContact, handleEditProfile };
