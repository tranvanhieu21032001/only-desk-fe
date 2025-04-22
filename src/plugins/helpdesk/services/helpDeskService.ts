import { v4 as uuidv4 } from "uuid";
import { Category, Article } from "../types";

// Mock data
let mockCategories: Record<string, Category> = {
  cat1: {
    id: "cat1",
    name: "Getting Started",
    description: "Basic guides to get started with the application",
    slug: "getting-started",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  cat2: {
    id: "cat2",
    name: "Advanced Features",
    description: "In-depth guides for advanced users",
    slug: "advanced-features",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

let mockArticles: Record<string, Article> = {
  art1: {
    id: "art1",
    categoryId: "cat1",
    title: "Welcome to the Application",
    content: "This is a getting started guide for new users.",
    slug: "welcome-to-application",
    author: "Admin",
    tags: ["beginner", "introduction"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  art2: {
    id: "art2",
    categoryId: "cat1",
    title: "How to Create Your First Project",
    content: "Learn how to create your first project step by step.",
    slug: "create-first-project",
    author: "Admin",
    tags: ["beginner", "project"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  art3: {
    id: "art3",
    categoryId: "cat2",
    title: "Advanced Configuration Options",
    content: "Explore advanced configuration options for power users.",
    slug: "advanced-configuration",
    author: "Admin",
    tags: ["advanced", "configuration"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

// Helper functions
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const createSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Service to manage HelpDesk functionality
 */
export const helpDeskService = {
  /**
   * Get all categories
   */
  getCategories: async (): Promise<Category[]> => {
    await delay(300); // Simulate API delay
    return Object.values(mockCategories);
  },

  /**
   * Get category by ID
   */
  getCategory: async (id: string): Promise<Category | null> => {
    await delay(200);
    return mockCategories[id] || null;
  },

  /**
   * Create a new category
   */
  createCategory: async (
    data: Omit<Category, "id" | "createdAt" | "updatedAt" | "slug">
  ): Promise<Category> => {
    await delay(300);
    const now = new Date().toISOString();
    const id = uuidv4();
    const slug = createSlug(data.name);

    const newCategory: Category = {
      id,
      slug,
      createdAt: now,
      updatedAt: now,
      ...data,
    };

    mockCategories[id] = newCategory;
    return newCategory;
  },

  /**
   * Update an existing category
   */
  updateCategory: async (
    id: string,
    data: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>
  ): Promise<Category | null> => {
    await delay(300);

    if (!mockCategories[id]) return null;

    const updatedCategory = {
      ...mockCategories[id],
      ...data,
      slug: data.name ? createSlug(data.name) : mockCategories[id].slug,
      updatedAt: new Date().toISOString(),
    };

    mockCategories[id] = updatedCategory;
    return updatedCategory;
  },

  /**
   * Delete a category
   */
  deleteCategory: async (id: string): Promise<boolean> => {
    await delay(300);

    if (!mockCategories[id]) return false;

    // Delete the category
    delete mockCategories[id];

    // Delete associated articles
    Object.values(mockArticles).forEach((article) => {
      if (article.categoryId === id) {
        delete mockArticles[article.id];
      }
    });

    return true;
  },

  /**
   * Get all articles
   */
  getArticles: async (categoryId?: string): Promise<Article[]> => {
    await delay(300);
    let articles = Object.values(mockArticles);

    if (categoryId) {
      articles = articles.filter(
        (article) => article.categoryId === categoryId
      );
    }

    return articles;
  },

  /**
   * Get article by ID
   */
  getArticle: async (id: string): Promise<Article | null> => {
    await delay(200);
    return mockArticles[id] || null;
  },

  /**
   * Create a new article
   */
  createArticle: async (
    data: Omit<Article, "id" | "createdAt" | "updatedAt" | "slug">
  ): Promise<Article | null> => {
    await delay(300);

    // Verify the category exists
    if (!mockCategories[data.categoryId]) return null;

    const now = new Date().toISOString();
    const id = uuidv4();
    const slug = createSlug(data.title);

    const newArticle: Article = {
      id,
      slug,
      createdAt: now,
      updatedAt: now,
      ...data,
    };

    mockArticles[id] = newArticle;
    return newArticle;
  },

  /**
   * Update an existing article
   */
  updateArticle: async (
    id: string,
    data: Partial<Omit<Article, "id" | "createdAt" | "updatedAt">>
  ): Promise<Article | null> => {
    await delay(300);

    if (!mockArticles[id]) return null;

    // If changing category, verify it exists
    if (data.categoryId && !mockCategories[data.categoryId]) return null;

    const updatedArticle = {
      ...mockArticles[id],
      ...data,
      slug: data.title ? createSlug(data.title) : mockArticles[id].slug,
      updatedAt: new Date().toISOString(),
    };

    mockArticles[id] = updatedArticle;
    return updatedArticle;
  },

  /**
   * Delete an article
   */
  deleteArticle: async (id: string): Promise<boolean> => {
    await delay(300);

    if (!mockArticles[id]) return false;

    delete mockArticles[id];
    return true;
  },
};
