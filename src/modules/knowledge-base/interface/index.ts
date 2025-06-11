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
