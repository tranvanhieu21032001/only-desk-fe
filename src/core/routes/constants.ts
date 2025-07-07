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
  ALL_PLUGINS: `${preRouterMain}/all-plugins`,
  INSTALLED_PLUGINS: `${preRouterMain}/installed-plugins`,

  // Admin
  WORKSPACE_ADMIN: `${preRouterMain}/admin/workspace`,
  USERS_ADMIN: `${preRouterMain}/admin/users`,
  PLUGINS_ADMIN: `${preRouterMain}/admin/plugins`,

  // Settings
  ACCOUNT: `${preRouterMain}/setting-account`,
  BILLING: `${preRouterMain}/billing`,
  CHANGEPLAN: `${preRouterMain}/billing/change-plan`,
  WORKSPACE: `${preRouterMain}/setting-workspace`,
  CHATBOX: `${preRouterMain}/chatbox`,
  EMAIL: `${preRouterMain}/email`,
  KNOWLEDGE_BASE: `${preRouterMain}/knowledge-base`,
  STATUS_PAGE: `${preRouterMain}/status-page`,

  // Profiles
  ACCOUNT_SETTINGS: `${preRouterMain}/account-settings`,
  INTEGRATIONS: `${preRouterMain}/integrations`,
  GUIDE: `${preRouterMain}/guide`,
  HELP_CENTER: `${preRouterMain}/help-center`,
  LOGOUT: `${preRouterMain}/logout`,
};

export { ADMIN_ROUTES, AUTH_ROUTES, MAIN_ROUTES };
