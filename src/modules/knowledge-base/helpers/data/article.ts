import {
  AccountMenuInterface,
  ActionFilterArticleOptionsInterface,
} from '../../models/article.model';
import { CategoriesInterface } from '@/modules/plugins/model/allPlugins';
import {
  AccountMenusEnums,
  ActionArticleFilterEnums,
  EnableTwoFactorEnums,
} from '../enums/article';

import icKey from '@/assets/icons/setting/ic-key.svg';
import icGmail from '@/assets/icons/setting/ic-gmail.svg';
import icApple from '@/assets/icons/setting/ic-apple.svg';
import icExport from '@/assets/icons/contact/ic-export.svg';
import icRemove from '@/assets/icons/contact/ic-remove.svg';
import icImport from '@/assets/icons/contact/ic-import.svg';
import icScanCode from '@/assets/icons/contact/ic-scan-code.svg';
import icConfigure from '@/assets/icons/contact/ic-configure.svg';
import icGlobal from '@/assets/icons/knowledge-base/ic-global.svg';
import icVerifyCode from '@/assets/icons/contact/ic-verify-code.svg';
import icViewMyKnowledgeBaSE from '@/assets/icons/knowledge-base/ic-monitor.svg';

const accountMenus: AccountMenuInterface[] = [
  {
    key: AccountMenusEnums?.ACCOUNT_INFORMATION,
    label: 'account-information',
  },
  {
    key: AccountMenusEnums?.NOTIFICATIONS,
    label: 'notifications',
  },
  {
    key: AccountMenusEnums?.AVAILABILITY,
    label: 'availability',
  },
  {
    key: AccountMenusEnums?.SECURITY,
    label: 'security',
  },
  {
    key: AccountMenusEnums?.INTERFACE,
    label: 'interface',
  },
  {
    key: AccountMenusEnums?.KEYBOARD_SHORTCUTS,
    label: 'keyboard-shortcuts',
  },
];

const progressEnableTwoFactor = [
  {
    key: EnableTwoFactorEnums?.PREPARE,
    icon: icConfigure,
    label: 'modal-enable-two-factor.prepare',
  },
  {
    key: EnableTwoFactorEnums.DRIVER,
  },
  {
    key: EnableTwoFactorEnums.SCAN_CODE,
    icon: icScanCode,
    label: 'modal-enable-two-factor.scan-code',
  },
  {
    key: EnableTwoFactorEnums.DRIVER_SECOND,
  },
  {
    key: EnableTwoFactorEnums.VERIFY_CODE,
    icon: icVerifyCode,
    label: 'modal-enable-two-factor.verify-code',
  },
];

const sensitiveActionMockup = [
  {
    key: 'password',
    label: 'Password',
    description: 'Your OnlyChat account password',
    icon: icKey,
  },
  {
    key: 'two-factor',
    label: 'Two-Factor',
    description: 'Provide a 6 digits 2FA code',
    icon: icScanCode,
  },
  {
    key: 'google',
    label: 'Google Sign-in',
    description: 'With your Google account',
    icon: icGmail,
  },
  {
    key: 'apple',
    label: 'Apple Sign-in',
    description: 'With your Apple account',
    icon: icApple,
  },
];

const statusMenu: CategoriesInterface[] = [
  {
    key: 'published',
    label: 'published',
    count: 2,
  },
  {
    key: 'visible',
    label: 'visible',
    count: 3,
  },
  {
    key: 'hidden',
    label: 'hidden',
    count: 12,
  },
  {
    key: 'draft',
    label: 'draft',
    count: 16,
  },
];

const actionFilterArticleOptions: ActionFilterArticleOptionsInterface[] = [
  {
    key: 'view-my-knowledge-base',
    label: 'view-my-knowledge-base',
    icon: icViewMyKnowledgeBaSE,
    actionType: ActionArticleFilterEnums?.VIEW_MY_KNOWLEDGE_BASE,
  },
  {
    key: 'add-a-new-language',
    label: 'add-a-new-language',
    icon: icGlobal,
    actionType: ActionArticleFilterEnums?.ADD_A_NEW_LANGUAGE,
  },
  {
    key: 'import-articles',
    label: 'import-articles',
    icon: icImport,
    actionType: ActionArticleFilterEnums?.IMPORT,
  },
  {
    key: 'export-articles',
    label: 'import-articles',
    icon: icExport,
    actionType: ActionArticleFilterEnums?.EXPORT,
  },
  {
    key: 'destroy-current-language',
    label: 'destroy-current-language',
    icon: icRemove,
    actionType: ActionArticleFilterEnums?.DESTROY_CURRENT_LANGUAGE,
  },
  {
    key: 'remove-selected-articles',
    label: 'remove-selected-articles',
    icon: icRemove,
    actionType: ActionArticleFilterEnums?.REMOVE_SELECTED_ARTICLES,
  },
];

export {
  accountMenus,
  progressEnableTwoFactor,
  sensitiveActionMockup,
  statusMenu,
  actionFilterArticleOptions,
};
