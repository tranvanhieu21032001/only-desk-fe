import {
  ActionFilterContactTypeEnums,
  ActionProfileDetailsTypeEnums,
} from '../helper/enums/contacts';

export interface ActionFilterOptionsInterface {
  key: string;
  label: string;
  icon: string;
  actionType: ActionFilterContactTypeEnums;
}

export interface ActionProfileDetailsOptionsInterface {
  key: string;
  label: string;
  icon: string;
  actionType: ActionProfileDetailsTypeEnums;
}
