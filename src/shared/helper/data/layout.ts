import { MAIN_ROUTES } from '@/core/routes/constants';

const chatsPaths: string[] = [
  MAIN_ROUTES?.INBOX,
  MAIN_ROUTES?.ASSIGNED_TO_ME,
  MAIN_ROUTES?.NEW_SUB_INBOX,
  MAIN_ROUTES?.SPAM_CHATS,
];

const pluginsPaths: string[] = [
  MAIN_ROUTES?.ALL_PLUGINS,
  MAIN_ROUTES?.INSTALLED_PLUGINS,
];

const settingsPaths: string[] = [
  MAIN_ROUTES?.ACCOUNT,
  MAIN_ROUTES?.BILLING,
  MAIN_ROUTES?.WORKSPACE,
  MAIN_ROUTES?.CHATBOX,
  MAIN_ROUTES?.EMAIL,
  MAIN_ROUTES?.KNOWLEDGE_BASE,
  MAIN_ROUTES?.STATUS_PAGE,
];

const hiddenHeaderRouter: string[] = [
  MAIN_ROUTES?.CONTACT_DETAILS,
  MAIN_ROUTES?.CONTACT_EDIT,
];

export { chatsPaths, pluginsPaths, settingsPaths, hiddenHeaderRouter };
