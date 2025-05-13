import { ImportProgressEnums, StatusProceedEnums } from './contact.enums';

import icProceed from '@/assets/icons/contact/ic-proceed.svg';
import icConfigure from '@/assets/icons/contact/ic-configure.svg';
import icSelectFile from '@/assets/icons/contact/ic-select-file.svg';

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
  },
  {
    key: 'email',
    label: 'email',
    value: 'admin@gmail.com',
  },
  {
    key: 'phone',
    label: 'phone',
    value: '+1 234 567 890',
  },
  {
    key: 'address',
    label: 'address',
    value: '123 Main St, New York, NY',
  },
  {
    key: 'website',
    label: 'website',
    value: 'www.sophiawilliams.com',
  },
  {
    key: 'creation-date',
    label: 'creation-date',
    value: 'Yesterday',
  },
  {
    key: 'last-update',
    label: 'last-update',
    value: '6 hour ago',
  },
  {
    key: 'gender',
    label: 'gender',
    value: 'Female',
  },
  {
    key: 'notification',
    label: 'notification',
    value: 'Active',
  },
];

const companyMockup = [
  'Company',
  'Job title',
  'Job role',
  'Website',
  'City',
  'Country',
  'Employees',
];

export {
  progressImport,
  proceedMockup,
  contactInformationMockup,
  companyMockup,
  lastReportedLocation,
};
