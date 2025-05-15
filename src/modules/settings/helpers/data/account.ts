import { AccountMenuInterface } from '../../models/account.model';
import { AccountMenusEnums, EnableTwoFactorEnums } from '../enums/account';

import icKey from '@/assets/icons/setting/ic-key.svg';
import icGmail from '@/assets/icons/setting/ic-gmail.svg';
import icApple from '@/assets/icons/setting/ic-apple.svg';
import icConfigure from '@/assets/icons/contact/ic-configure.svg';
import icScanCode from '@/assets/icons/contact/ic-scan-code.svg';
import icVerifyCode from '@/assets/icons/contact/ic-verify-code.svg';

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

export { accountMenus, progressEnableTwoFactor, sensitiveActionMockup };
