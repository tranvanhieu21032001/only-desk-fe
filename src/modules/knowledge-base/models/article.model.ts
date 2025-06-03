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


export interface AllArticleInterface {
  key: string;
  title: string;
  status: 'online' | 'draft' | 'hidden' | 'visible';
  statistic: string;
  created: string;
  lastUpdate: string;
  category: string;
  isCategoryRow?: boolean;
}
