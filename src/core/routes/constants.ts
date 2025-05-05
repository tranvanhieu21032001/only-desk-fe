const preRouterAdmin = '/';
const preRouterAuth = '/auth';
const preRouterMain = '';

const ADMIN_ROUTES = {
  DASHBOARD: preRouterAdmin,
  FORBIDDEN: '/403',
};

const AUTH_ROUTES = {
  SIGN_IN: `${preRouterAuth}/sign-in`,
  SIGN_UP: `${preRouterAuth}/sign-up`,
  FORGOT_PASSWORD: `${preRouterAuth}/forgot-password`,
  DESIGN_SYSTEM: `${preRouterAuth}/design-system`,
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
  USER: `${preRouterMain}/user`,

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

  // Settings
  ACCOUNT: `${preRouterMain}/account`,
  BILLING: `${preRouterMain}/billing`,
  WORKSPACE: `${preRouterMain}/workspace`,
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
