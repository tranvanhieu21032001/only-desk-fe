export interface HelpdeskArticle {
    id: string;
    title: string;
    content: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}

export interface HelpdeskArticleListResponse {
    data: HelpdeskArticle[];
    total: number;
    page: number;
    limit: number;
}


export interface HelpdeskCategoryTranslation {
    name: string;
    desc: string;
}

export interface HelpdeskCategoryCreatePayload {
    name: string;
    desc: string;
    slug: string;
    image: string;
    translations: {
        [langCode: string]: HelpdeskCategoryTranslation;
    };
    defaultLanguage: string;
}


export interface HelpdeskCategory {
    id: string;
    name: string;
    image: string;
    slug: string;
    desc: string;
    createdAt: string;
    updatedAt: string;
    sections: Section[];
    translations: {
        [lang: string]: {
            name: string;
            desc: string;
        };
    };
    defaultLanguage: string;
    workspaceId: string;
}

export interface HelpdeskCategoryResponse {
    id: string;
    name: string;
};

export interface HelpdeskArticleCreatePayload {
    title: string;
    content: string;
    categoryId: string;
    translations: {
        [lang: string]: {
            title: string;
            content: string;
        };
    };
    defaultLanguage: string;
    tags?: string[];
    slug: string;
    status: 'published';
}


export interface HelpdeskSectionCreatePayload {
    name: string;
    categoryId: string;
    translations: {
        [langCode: string]: {
            name: string;
        };
    };
    defaultLanguage: string;
}

export interface Section {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  articles:string[];
  translations: { [key: string]: { name: string } };
}

export interface Category {
  id: string;
  name: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  translations: { [key: string]: { name: string; desc: string } };
  defaultLanguage: string;
  sections: Section[];
}

export interface RowItem {
  key: string;
  title: string;
  description: string;
  statistic: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  isCategoryRow: boolean;
}
