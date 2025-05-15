enum AccountMenusEnums {
  ACCOUNT_INFORMATION = 'account-information',
  NOTIFICATIONS = 'notifications',
  AVAILABILITY = 'availability',
  SECURITY = 'security',
  INTERFACE = 'interface',
  KEYBOARD_SHORTCUTS = 'keyboard-shortcuts',
}

enum EnableTwoFactorEnums {
  PREPARE = 'PREPARE',
  SCAN_CODE = 'SCAN_CODE',
  VERIFY_CODE = 'VERIFY_CODE',
  DRIVER = 'DRIVER',
  DRIVER_SECOND = 'DRIVER_SECOND',
}

enum ChangePasswordStepEnums {
  NEW_PASSWORD = 'NEW_PASSWORD',
  SENSITIVE_ACTION = 'SENSITIVE_ACTION',
  VERIFY_PASSWORD = 'VERIFY_PASSWORD',
  CREDENTIALS = 'CREDENTIALS',
}

enum DeleteAccountStepEnums {
  ENTER_EMAIL = 'ENTER_EMAIL',
  SENSITIVE_ACTION = 'SENSITIVE_ACTION',
  CREDENTIALS = 'CREDENTIALS',
}

enum DisableTwoFactorStepEnums {
  DISABLE_TWO_FACTOR = 'DISABLE_TWO_FACTOR',
  SENSITIVE_ACTION = 'SENSITIVE_ACTION',
  VERIFY_PASSWORD = 'VERIFY_PASSWORD',
  CREDENTIALS = 'CREDENTIALS',
}

enum ActionArticleFilterEnums {
  IMPORT = 'IMPORT',
  EXPORT = 'EXPORT',
  ADD_A_NEW_LANGUAGE = 'ADD_A_NEW_LANGUAGE',
  VIEW_MY_KNOWLEDGE_BASE = 'VIEW_MY_KNOWLEDGE_BASE',
  REMOVE_SELECTED_ARTICLES = 'REMOVE_SELECTED_ARTICLES',
  DESTROY_CURRENT_LANGUAGE = 'DESTROY_CURRENT_LANGUAGE',
}

export {
  AccountMenusEnums,
  EnableTwoFactorEnums,
  ChangePasswordStepEnums,
  DeleteAccountStepEnums,
  DisableTwoFactorStepEnums,
  ActionArticleFilterEnums,
};
