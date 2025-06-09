import React from 'react';

import { AUTH_ROUTES, MAIN_ROUTES } from './constants';
import { RouterElementInterface } from './model';

const SignIn = React.lazy(() => import('@/modules/auth/pages/sign-in/SignIn'));
const SignUp = React.lazy(() => import('@/modules/auth/pages/sign-up/SignUp'));
const ForgotPassword = React.lazy(
  () => import('@/modules/auth/pages/forgot-password/ForgotPassword'),
);

const Inbox = React.lazy(
  () => import('@/modules/inbox/pages/inbox-page/InboxPage'),
);
const LandingPage = React.lazy(() => import('@/modules/landing'));
const AllPLugins = React.lazy(
  () => import('@/modules/plugins/pages/plugins/Plugins'),
);
const SpamChat = React.lazy(
  () => import('@/modules/inbox/pages/spam-chat-page/SpamChatpage'),
);
const PageNotFound = React.lazy(
  () => import('@/shared/components/common/PageNotFound'),
);

//Contacts
const Contacts = React.lazy(
  () => import('@/modules/contacts/pages/contacts/Contacts'),
);
const ContactDetails = React.lazy(
  () => import('@/modules/contacts/pages/contact-details/ContactDetails'),
);
// const ContactEdit = React.lazy(
//   () => import('@/modules/contacts/pages/contact-edit/ContactEdit'),
// );

//Settings
const Account = React.lazy(
  () => import('@/modules/settings/pages/account/Account'),
);
const Workspace = React.lazy(
  () => import('@/modules/settings/pages/workspace/Workspace'),
);
const Billing = React.lazy(
  () => import('@/modules/settings/pages/billing/Billing'),
);

const ChangePlan = React.lazy(
  () => import('@/modules/settings/components/billing/billing-content/main/change-plan/ChangePlan'),
);

//Knowledge Base
const Articles = React.lazy(
  () => import('@/modules/knowledge-base/pages/articles/Articles'),
);

const ChatboxPage = React.lazy(
  () => import('@/modules/inbox/pages/chatbox-page/ChatboxPage'),
);

const Chatbox = React.lazy(
  () => import('@/modules/settings/pages/chatbox/Chatbox'),
);

const routes_admin: RouterElementInterface[] = [];

const routes_auth: RouterElementInterface[] = [
  {
    key: 'sign-in',
    path: AUTH_ROUTES?.SIGN_IN,
    component: SignIn,
    name: 'auth-sign-in',
  },
  {
    key: 'sign-up-1',
    path: AUTH_ROUTES?.SIGN_UP,
    component: SignUp,
    name: 'auth-sign-up',
  },
  {
    key: 'forgot-password',
    path: AUTH_ROUTES?.FORGOT_PASSWORD,
    component: ForgotPassword,
    name: 'auth-forgot-password',
  },
];

const routes_main: RouterElementInterface[] = [
  {
    key: 'home',
    path: MAIN_ROUTES.HOME,
    component: LandingPage,
    name: 'landing-page',
  },
  //Chats
  {
    key: 'inbox',
    path: MAIN_ROUTES.INBOX,
    component: Inbox,
    name: 'main-inbox',
  },
  {
    key: 'assigned-to-me',
    path: MAIN_ROUTES.ASSIGNED_TO_ME,
    component: PageNotFound,
    name: 'assigned-to-me',
  },
  {
    key: 'new-sub-inbox',
    path: MAIN_ROUTES.NEW_SUB_INBOX,
    component: PageNotFound,
    name: 'new-sub-inbox',
  },
  {
    key: 'spam-chats',
    path: MAIN_ROUTES.SPAM_CHATS,
    component: SpamChat,
    name: 'spam-chats',
  },

  //Global
  {
    key: 'global',
    path: MAIN_ROUTES.GLOBAL,
    component: PageNotFound,
    name: 'global',
  },

  //Contact
  {
    key: 'contacts',
    path: MAIN_ROUTES.CONTACTS,
    component: Contacts,
    name: 'contacts',
  },
  {
    key: 'contact-details',
    path: MAIN_ROUTES.CONTACT_DETAILS,
    component: ContactDetails,
    name: 'contact-details',
  },
  {
    key: 'contact-edit',
    path: MAIN_ROUTES.CONTACT_EDIT,
    component: ContactDetails,
    name: 'contact-edit',
  },

  //Ai Automation
  {
    key: 'ai-chatbot',
    path: MAIN_ROUTES.AI_CHATBOT,
    component: PageNotFound,
    name: 'ai-chatbot',
  },
  {
    key: 'chatbox-trigger',
    path: MAIN_ROUTES.CHATBOX_TRIGGER,
    component: PageNotFound,
    name: 'chatbox-trigger',
  },
  {
    key: 'answer-snippets',
    path: MAIN_ROUTES.ANSWER_SNIPPETS,
    component: PageNotFound,
    name: 'answer-snippets',
  },
  {
    key: 'web-content',
    path: MAIN_ROUTES.WEB_CONTENT,
    component: PageNotFound,
    name: 'web-content',
  },
  {
    key: 'inbox-messages',
    path: MAIN_ROUTES.INBOX_MESSAGES,
    component: PageNotFound,
    name: 'inbox-messages',
  },

  //Campaign
  {
    key: 'campaign',
    path: MAIN_ROUTES.CAMPAIGNS,
    component: PageNotFound,
    name: 'campaign',
  },

  //Knowledge Base
  {
    key: 'knowledge-base-article',
    path: MAIN_ROUTES.KNOWLEDGE_BASE_ARTICLE,
    component: Articles,
    name: 'knowledge-base-article',
  },

  {
    key: 'articles',
    path: MAIN_ROUTES.ARTICLES,
    component: Articles,
    name: 'articles',
  },
  {
    key: 'categories',
    path: MAIN_ROUTES.CATEGORIES,
    component: Articles,
    name: 'categories',
  },

  //Charts
  {
    key: 'charts',
    path: MAIN_ROUTES.CHARTS,
    component: PageNotFound,
    name: 'charts',
  },

  //Plugins
  {
    key: 'all-plugins',
    path: MAIN_ROUTES.ALL_PLUGINS,
    component: AllPLugins,
    name: 'all-plugins',
  },
  {
    key: 'installed-plugins',
    path: MAIN_ROUTES.INSTALLED_PLUGINS,
    component: PageNotFound,
    name: 'installed-plugins',
  },

  //Settings
  {
    key: 'account',
    path: MAIN_ROUTES.ACCOUNT,
    component: Account,
    name: 'account',
  },
  {
    key: 'billing',
    path: MAIN_ROUTES.BILLING,
    component: Billing,
    name: 'billing',
  },
    {
    key: 'change-plan',
    path: MAIN_ROUTES.CHANGEPLAN,
    component: ChangePlan,
    name: 'change-plan',
  },
  {
    key: 'setting-workspace',
    path: MAIN_ROUTES.WORKSPACE,
    component: Workspace,
    name: 'setting-workspace',
  },
  {
    key: 'chatbox',
    path: MAIN_ROUTES.CHATBOX,
    component: Chatbox,
    name: 'chatbox',
  },
  {
    key: 'email',
    path: MAIN_ROUTES.EMAIL,
    component: PageNotFound,
    name: 'email',
  },
  {
    key: 'knowledge-base',
    path: MAIN_ROUTES.KNOWLEDGE_BASE,
    component: PageNotFound,
    name: 'knowledge-base',
  },
  {
    key: 'status-page',
    path: MAIN_ROUTES.STATUS_PAGE,
    component: PageNotFound,
    name: 'status-page',
  },

  //User Profile
  {
    key: 'account-settings',
    path: MAIN_ROUTES.ACCOUNT_SETTINGS,
    component: PageNotFound,
    name: 'account-settings',
  },
  {
    key: 'integrations',
    path: MAIN_ROUTES.INTEGRATIONS,
    component: PageNotFound,
    name: 'integrations',
  },
  {
    key: 'guide',
    path: MAIN_ROUTES.GUIDE,
    component: PageNotFound,
    name: 'guide',
  },
  {
    key: 'help-center',
    path: MAIN_ROUTES.HELP_CENTER,
    component: PageNotFound,
    name: 'help-center',
  },
];

export { routes_auth, routes_admin, routes_main };
