import { BreadcrumbItem } from './model';

const preRouterAdmin = '/';
const preRouterAuth = '/auth';
const preRouterMain = '';

const ADMIN_ROUTES = {
  DASHBOARD: preRouterAdmin,
  FORBIDDEN: '/403',
};

const AUTH_ROUTES = {
  SIGN_IN: `${preRouterAuth}/login`,
  SIGN_UP: `${preRouterAuth}/sign-up`,
  CONFIRM_CODE: `${preRouterAuth}/sign-up/confirm-code`,
  FORGOT_PASSWORD: `${preRouterAuth}/forgot-password`,
  DESIGN_SYSTEM: `${preRouterAuth}/design-system`,
  GETTING_STARTED: `${preRouterAuth}/getting-started`,
  ACCEPT_INVITATION: `${preRouterAuth}/accept-invitation`,
  ACTIVE_PRODUCT: `${preRouterAuth}/sign-up/activating-product`,
  YOUR_NAME: `${preRouterAuth}/sign-up/your-name`,
  WEBSITE_ADDRESS: `${preRouterAuth}/sign-up/website-address`,
  CONNECT_ONLY_CHAT: `${preRouterAuth}/sign-up/connect-only-chat`,
  COMPANY_SIZE: `${preRouterAuth}/sign-up/company-size`,
  CUSTOMER: `${preRouterAuth}/sign-up/customer`,
};

const MAIN_ROUTES = {
  HOME: '/',
  // Chats
  INBOX: `${preRouterMain}/inbox`,
  ASSIGNED_TO_ME: `${preRouterMain}/assigned-to-me`,
  NEW_SUB_INBOX: `${preRouterMain}/new-sub-inbox`,
  SPAM_CHATS: `${preRouterMain}/spam-chats`,

  // Global
  GLOBAL: `${preRouterMain}/global`,

  //User
  CONTACTS: `${preRouterMain}/contacts`,
  CONTACT_DETAILS: `${preRouterMain}/contacts/:id`,
  CONTACT_EDIT: `${preRouterMain}/contacts/edit/:id`,

  //Campaigns
  CAMPAIGNS: `${preRouterMain}/campaigns`,

  //Charts
  CHARTS: `${preRouterMain}/charts`,

  //Ai Automation
  AI_CHATBOT: `${preRouterMain}/ai-chatbot`,
  CHATBOX_TRIGGER: `${preRouterMain}/chatbox-trigger`,
  ANSWER_SNIPPETS: `${preRouterMain}/answer-snippets`,
  WEB_CONTENT: `${preRouterMain}/web-content`,
  INBOX_MESSAGES: `${preRouterMain}/inbox-messages`,
  KNOWLEDGE_BASE_ARTICLE: `${preRouterMain}/knowledge-base-article`,

  //Knowledge Base
  ARTICLES: `${preRouterMain}/articles`,
  CATEGORIES: `${preRouterMain}/categories`,

  // Plugins
  ALL_PLUGINS: `${preRouterMain}/plugins`,
  INSTALLED_PLUGINS: `${preRouterMain}/installed-plugins`,

  // Admin
  WORKSPACE_ADMIN: `${preRouterMain}/admin/workspace`,
  USERS_ADMIN: `${preRouterMain}/admin/users`,
  PLUGINS_ADMIN: `${preRouterMain}/admin/plugins`,

  // Settings
  ACCOUNT: `${preRouterMain}/setting-account`,
  BILLING: `${preRouterMain}/setting/billing`,
  CHANGEPLAN: `${preRouterMain}/setting/billing/change-plan`,
  WORKSPACE: `${preRouterMain}/setting-workspace`,
  CHATBOX: `${preRouterMain}/chatbox`,
  EMAIL: `${preRouterMain}/email`,
  KNOWLEDGE_BASE: `${preRouterMain}/setting/knowledge-base`,
  STATUS_PAGE: `${preRouterMain}/status-page`,

  CHECKOUT_SUCCESS: `${preRouterMain}/checkout/success`,
  // Profiles
  ACCOUNT_SETTINGS: `${preRouterMain}/account-settings`,
  INTEGRATIONS: `${preRouterMain}/integrations`,
  GUIDE: `${preRouterMain}/guide`,
  HELP_CENTER: `${preRouterMain}/help-center`,
  LOGOUT: `${preRouterMain}/logout`,
};

const getBreadcrumbMap = (t: (key: string) => string): BreadcrumbItem[] => [
  // === Trang chính ===
  { path: MAIN_ROUTES.HOME, breadcrumb: [t('breadcrumb.home')] },

  // === Chats ===
  { path: MAIN_ROUTES.INBOX, breadcrumb: [t('breadcrumb.inbox')] },
  {
    path: MAIN_ROUTES.ASSIGNED_TO_ME,
    breadcrumb: [t('breadcrumb.assigned_to_me')],
  },
  {
    path: MAIN_ROUTES.NEW_SUB_INBOX,
    breadcrumb: [t('breadcrumb.new_sub_inbox')],
  },
  { path: MAIN_ROUTES.SPAM_CHATS, breadcrumb: [t('breadcrumb.spam_inbox')] },

  // === Global / Visitors ===
  { path: MAIN_ROUTES.GLOBAL, breadcrumb: [t('breadcrumb.visitors')] },

  // === Contacts ===
  { path: MAIN_ROUTES.CONTACTS, breadcrumb: [t('breadcrumb.contacts')] },
  {
    path: MAIN_ROUTES.CONTACT_DETAILS, // /contacts/:id
    breadcrumb: [t('breadcrumb.contacts'), t('breadcrumb.contact_details')],
  },
  {
    path: MAIN_ROUTES.CONTACT_EDIT, // /contacts/edit/:id
    breadcrumb: [t('breadcrumb.contacts'), t('breadcrumb.contact_edit')],
  },

  // === Campaigns ===
  { path: MAIN_ROUTES.CAMPAIGNS, breadcrumb: [t('breadcrumb.campaigns')] },

  // === Charts ===
  { path: MAIN_ROUTES.CHARTS, breadcrumb: [t('breadcrumb.charts')] },

  // === AI Automation ===
  { path: MAIN_ROUTES.AI_CHATBOT, breadcrumb: [t('breadcrumb.ai_chatbot')] },
  {
    path: MAIN_ROUTES.CHATBOX_TRIGGER,
    breadcrumb: [t('breadcrumb.chatbox_trigger')],
  },
  {
    path: MAIN_ROUTES.ANSWER_SNIPPETS,
    breadcrumb: [t('breadcrumb.answer_snippets')],
  },
  { path: MAIN_ROUTES.WEB_CONTENT, breadcrumb: [t('breadcrumb.web_content')] },
  {
    path: MAIN_ROUTES.INBOX_MESSAGES,
    breadcrumb: [t('breadcrumb.inbox_messages')],
  },
  {
    path: MAIN_ROUTES.KNOWLEDGE_BASE_ARTICLE,
    breadcrumb: [t('breadcrumb.knowledge_base_article')],
  },

  // === Knowledge Base ===
  { path: MAIN_ROUTES.ARTICLES, breadcrumb: [t('breadcrumb.articles')] },
  { path: MAIN_ROUTES.CATEGORIES, breadcrumb: [t('breadcrumb.categories')] },

  // === Plugins ===
  { path: MAIN_ROUTES.ALL_PLUGINS, breadcrumb: [t('breadcrumb.all-plugins')] },
  {
    path: MAIN_ROUTES.INSTALLED_PLUGINS,
    breadcrumb: [t('breadcrumb.installed_plugins')],
  },

  // === Admin ===
  {
    path: MAIN_ROUTES.WORKSPACE_ADMIN,
    breadcrumb: [t('breadcrumb.workspace_admin')],
  },
  { path: MAIN_ROUTES.USERS_ADMIN, breadcrumb: [t('breadcrumb.users_admin')] },
  {
    path: MAIN_ROUTES.PLUGINS_ADMIN,
    breadcrumb: [t('breadcrumb.plugins_admin')],
  },

  // === Settings ===
  { path: MAIN_ROUTES.ACCOUNT, breadcrumb: [t('breadcrumb.account_settings')] },
  { path: MAIN_ROUTES.BILLING, breadcrumb: [t('breadcrumb.billing')] },
  { path: MAIN_ROUTES.CHANGEPLAN, breadcrumb: [t('breadcrumb.change_plan')] },
  { path: MAIN_ROUTES.WORKSPACE, breadcrumb: [t('breadcrumb.workspace')] },
  { path: MAIN_ROUTES.CHATBOX, breadcrumb: [t('breadcrumb.chatbox')] },
  { path: MAIN_ROUTES.EMAIL, breadcrumb: [t('breadcrumb.email')] },
  {
    path: MAIN_ROUTES.KNOWLEDGE_BASE,
    breadcrumb: [t('breadcrumb.kb_setting')],
  },
  { path: MAIN_ROUTES.STATUS_PAGE, breadcrumb: [t('breadcrumb.status_page')] },

  // === Profiles / Others ===
  {
    path: MAIN_ROUTES.ACCOUNT_SETTINGS,
    breadcrumb: [t('breadcrumb.account_settings')],
  },
  {
    path: MAIN_ROUTES.INTEGRATIONS,
    breadcrumb: [t('breadcrumb.integrations')],
  },
  { path: MAIN_ROUTES.GUIDE, breadcrumb: [t('breadcrumb.guide')] },
  { path: MAIN_ROUTES.HELP_CENTER, breadcrumb: [t('breadcrumb.help_center')] },
  { path: MAIN_ROUTES.LOGOUT, breadcrumb: [t('breadcrumb.logout')] },
];
export { ADMIN_ROUTES, AUTH_ROUTES, MAIN_ROUTES, getBreadcrumbMap };
