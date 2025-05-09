import { ImportProgressEnums } from './contact.enums';

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

export { progressImport };
