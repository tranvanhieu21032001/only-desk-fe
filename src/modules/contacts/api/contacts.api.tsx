import { updateRequest } from '@/core/services/requests';
import {
  actionUpdateIsLoading,
  actionUpdateContactDetails,
} from '../store/features/contacts';
import { omit } from 'lodash';
import { omitKeys } from '../helpers/contact.data';

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
  const metadataConvert = values?.metadata?.reduce(
    (acc: any, cur: any) => {
      if (cur?.key) {
        acc[cur?.key] = cur?.value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  const updatePayload = omit(
    {
      ...values,
      companyInfo: {
        name: values?.nameCompany,
        position: values?.positionCompany,
        department: values?.departmentCompany,
        website: values?.websiteCompany,
        city: values?.cityCompany,
        country: values?.countryCompany,
        employees: values?.employeesCompany,
      },
      metadata: metadataConvert,
    },
    omitKeys,
  );

  await updateRequest(endpointContact.UPDATE_CONTACT.replace(':id', id), {
    data: updatePayload,
    messageSuccess: messageSuccess,
  })
    .then(() => {
      dispatch(actionUpdateContactDetails(updatePayload));
    })
    .finally(() => dispatch(actionUpdateIsLoading(false)));
};

export { endpointContact, handleEditProfile };
