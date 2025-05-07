import { ActionFilterContactTypeEnums } from '../helper/enums/contacts';

export interface ActionFilterOptionsInterface {
  key: string;
  label: string;
  icon: string;
  actionType: ActionFilterContactTypeEnums;
}
