import {
  GenderOptions,
  ImportProgressEnums,
  StatusProceedEnums,
} from './contact.enums';

import icProceed from '@/assets/icons/contact/ic-proceed.svg';
import icConfigure from '@/assets/icons/contact/ic-configure.svg';
import icSelectFile from '@/assets/icons/contact/ic-select-file.svg';
import { FormTypeEnums } from '@/shared/helper/enums/common';
import { LabeledValue } from 'antd/es/select';

const progressImport = [
  {
    key: ImportProgressEnums.SELECT_FILE,
    icon: icSelectFile,
    label: 'modal-import-contact.select-file',
  },
  {
    key: ImportProgressEnums.DRIVER,
  },
  {
    key: ImportProgressEnums.CONFIGURE,
    icon: icConfigure,
    label: 'modal-import-contact.configure',
  },
  {
    key: ImportProgressEnums.DRIVER_SECOND,
  },
  {
    key: ImportProgressEnums.PROCEED,
    icon: icProceed,
    label: 'modal-import-contact.proceed',
  },
];

const proceedMockup = [
  {
    key: StatusProceedEnums?.CONTACTS_IMPORTED,
    label: 'modal-import-contact.contacts-imported',
    count: 4,
  },
  {
    key: StatusProceedEnums?.SKIPPED,
    label: 'modal-import-contact.skipped',
    count: 8,
  },
  {
    key: StatusProceedEnums?.REMAINING,
    label: 'modal-import-contact.remaining',
    count: 9,
  },
];

const lastReportedLocation = [
  {
    key: 'city',
    label: 'city',
    value: 'New York, USA',
  },
  {
    key: 'local-time',
    label: 'local-time',
    value: '2:34pm (UTC +7)',
  },
  {
    key: 'languages',
    label: 'languages',
    value: 'English, Spanish',
  },
];

const contactInformationMockup = [
  {
    key: 'name',
    label: 'name',
    value: 'Sophia Williams',
    type: FormTypeEnums?.INPUT,
    placeholder: 'Enter name',
  },
  {
    key: 'email',
    label: 'email',
    value: 'admin@gmail.com',
    type: FormTypeEnums?.INPUT,
    placeholder: 'Enter email',
  },
  {
    key: 'phoneNumber',
    label: 'phone',
    value: '+1 234 567 890',
    type: FormTypeEnums?.PHONE_NUMBER,
    placeholder: 'Enter phone number',
  },
  {
    key: 'address',
    label: 'address',
    value: '123 Main St, New York, NY',
    type: FormTypeEnums?.INPUT,
    placeholder: 'Enter address',
  },
  {
    key: 'website',
    label: 'website',
    value: 'www.sophiawilliams.com',
    type: FormTypeEnums?.WEBSITE,
    placeholder: 'Enter website',
  },
  {
    key: 'createdAt',
    label: 'creation-date',
    value: 'Yesterday',
    type: FormTypeEnums?.CREATE_DATE,
  },
  {
    key: 'updatedAt',
    label: 'last-update',
    value: '6 hour ago',
    type: FormTypeEnums?.CREATE_DATE,
  },
  {
    key: 'gender',
    label: 'gender',
    value: 'Female',
    type: FormTypeEnums?.SELECT,
    placeholder: 'Select gender',
  },
  {
    key: 'notification',
    label: 'notification',
    value: 'Active',
    type: FormTypeEnums?.SWITCH,
  },
];

const companyMockup = [
  {
    key: 'nameCompany',
    label: 'company',
    type: FormTypeEnums?.INPUT,
    placeholder: 'enter-company-name',
    fieldName: 'name',
  },
  {
    key: 'positionCompany',
    label: 'position',
    type: FormTypeEnums?.INPUT,
    placeholder: 'enter-position',
    fieldName: 'position',
  },
  {
    key: 'departmentCompany',
    label: 'department',
    value: 'Sophia Williams',
    type: FormTypeEnums?.INPUT,
    placeholder: 'enter-department',
    fieldName: 'department',
  },
  {
    key: 'websiteCompany',
    label: 'website',
    value: 'Sophia Williams',
    type: FormTypeEnums?.INPUT,
    placeholder: 'enter-website',
    fieldName: 'website',
  },
  {
    key: 'cityCompany',
    label: 'city-label',
    value: 'Sophia Williams',
    type: FormTypeEnums?.INPUT,
    placeholder: 'enter-city',
    fieldName: 'city',
  },
  {
    key: 'countryCompany',
    label: 'country',
    value: 'Female',
    type: FormTypeEnums?.INPUT,
    placeholder: 'enter-country',
    fieldName: 'country',
  },
  {
    key: 'employeesCompany',
    label: 'employees',
    value: 'Sophia Williams',
    type: FormTypeEnums?.INPUT,
    placeholder: 'enter-employees',
    fieldName: 'employees',
  },
];

const genderOptions: LabeledValue[] = [
  {
    key: GenderOptions?.MALE,
    value: GenderOptions?.MALE,
    label: 'male',
  },
  {
    key: GenderOptions?.FEMALE,
    value: GenderOptions?.FEMALE,
    label: 'female',
  },
];

const omitKeys: string[] = [
  'nameCompany',
  'positionCompany',
  'departmentCompany',
  'websiteCompany',
  'cityCompany',
  'countryCompany',
  'employeesCompany',
  'positionCompany',
  'dataForm',
];

export {
  progressImport,
  proceedMockup,
  contactInformationMockup,
  companyMockup,
  lastReportedLocation,
  genderOptions,
  omitKeys,
};
