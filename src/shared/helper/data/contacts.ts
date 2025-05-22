import {
  ActionFilterContactTypeEnums,
  ActionProfileDetailsTypeEnums,
} from '../enums/contacts';
import {
  ActionFilterOptionsInterface,
  ActionProfileDetailsOptionsInterface,
} from '@/shared/model/contacts';

import icEdit from '@/assets/icons/contact/ic-edit.svg';
import icExport from '@/assets/icons/contact/ic-export.svg';
import icImport from '@/assets/icons/contact/ic-import.svg';
import icRemove from '@/assets/icons/contact/ic-remove.svg';
import icCopyLink from '@/assets/icons/contact/ic-copy-link.svg';

const MAX_COUNT: number = 10;

const actionFilterOptions: ActionFilterOptionsInterface[] = [
  {
    key: 'export',
    label: 'export',
    icon: icExport,
    actionType: ActionFilterContactTypeEnums?.EXPORT,
  },
  {
    key: 'import',
    label: 'import',
    icon: icImport,
    actionType: ActionFilterContactTypeEnums?.IMPORT,
  },
  {
    key: 'remove-selected-profiles',
    label: 'remove-selected-profiles',
    icon: icRemove,
    actionType: ActionFilterContactTypeEnums?.REMOVE,
  },
];

const csvMockup = [
  {
    id: 1,
    name: 'Email',
  },
  {
    id: 2,
    name: 'First Name',
  },
  {
    id: 3,
    name: 'Last Name',
  },
  {
    id: 4,
    name: 'Phone',
  },
  {
    id: 5,
    name: 'Address',
  },
];

const actionsProfileDetailsOptions: ActionProfileDetailsOptionsInterface[] = [
  {
    key: 'edit-profile',
    label: 'edit-profile',
    icon: icEdit,
    actionType: ActionProfileDetailsTypeEnums?.EDIT,
  },
  {
    key: 'copy-link',
    label: 'copy-link',
    icon: icCopyLink,
    actionType: ActionProfileDetailsTypeEnums?.COPY,
  },
  {
    key: 'remove-profile',
    label: 'remove-profile',
    icon: icRemove,
    actionType: ActionProfileDetailsTypeEnums?.REMOVE,
  },
];

export {
  actionsProfileDetailsOptions,
  actionFilterOptions,
  csvMockup,
  MAX_COUNT,
};
