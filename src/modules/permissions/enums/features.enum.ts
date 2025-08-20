export enum FeatureKey {
  CHAT = 'chat',
  VISITOR = 'visitor',
  CONTACT = 'contact',
  KNOWLEDGE_BASE = 'knowledge_base',
  PLUGINS = 'plugins',
  WORKSPACE = 'workspace',
  ADMIN_PANEL = 'admin_panel',
  ACCOUNT_SETTINGS = 'account_settings',
  BILLING_SETTINGS = 'billing_settings',

  //plugins
  SHORTCUT = 'shortcut',
  PRIVATE_NOTE = 'private_note',
}

export enum PrivateNoteAction {
  SEND_NOTE = 'send_note',
}

export enum ShortcutAction {
  SEND_SHORTCUT_MESSAGE = 'send_shortcut_message',
  MANAGE_SHORTCUT = 'manage_shortcut',
}

export enum HelpdeskAction {
  MANAGE_KNOWLEDGE_BASE = 'manage_knowledge_base',
  KNOWLEDGE_BASE_SETTINGS = 'knowledge_base_settings',
  SEND_KNOWLEDGE_BASE_MESSAGE = 'send_knowledge_base_message',
}
