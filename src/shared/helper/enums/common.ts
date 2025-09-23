enum ToastMessageType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

enum FormTypeEnums {
  INPUT = 'input',
  SELECT = 'select',
  SWITCH = 'switch',
  TEXT = 'text',
  PHONE_NUMBER = 'phone-number',
  CREATE_DATE = 'create-date',
  WEBSITE = 'website',
}

 enum ConversationFilterEnum {
  ALL = 'ALL',
  UNREAD = 'UNREAD',
  UNRESOLVED = 'UNRESOLVED',
  RESOLVED = 'RESOLVED',
  MOST_RECENT = 'MOST_RECENT',
}


export { ToastMessageType, FormTypeEnums, ConversationFilterEnum };
