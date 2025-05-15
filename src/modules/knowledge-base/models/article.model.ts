import {
  AccountMenusEnums,
  ActionArticleFilterEnums,
} from '../helpers/enums/article';

export interface AccountMenuInterface {
  key: AccountMenusEnums;
  label: string;
}

export interface ActionFilterArticleOptionsInterface {
  key: string;
  label: string;
  icon: string;
  actionType: ActionArticleFilterEnums;
}
