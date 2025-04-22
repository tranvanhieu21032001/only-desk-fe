/**
 * HelpDesk Category interface
 */
export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * HelpDesk Article interface
 */
export interface Article {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  slug: string;
  author: string;
  tags?: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * HelpDesk State interface
 */
export interface HelpDeskState {
  categories: Record<string, Category>;
  articles: Record<string, Article>;
  isLoading: boolean;
  error: string | null;
}
