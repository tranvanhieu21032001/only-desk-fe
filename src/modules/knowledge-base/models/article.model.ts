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
  id?: string;
  title: string;
  content?: string;
  status?: string;
  statistic?: string;
  created?: string;
  lastUpdate?: string;
  defaultLanguage?: string;
  category: string;
  categoryId?: string;
  sectionId?: string;
  isCategoryRow?: boolean;
  url?: string;
  translations?: Record<string, { title: string; content: string }>;
}

export interface AllCategoriesInterface {
  key: string;
  title: string;
  description: string;
  statistic: string;
  created: string;
  lastUpdate: string;
  category: string;
  isCategoryRow?: boolean;
}


