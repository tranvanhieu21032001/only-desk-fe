import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRequest,
} from '@/core/services/requests';

import {
  HelpdeskArticleCreatePayload,
  HelpdeskArticleListResponse,
  HelpdeskCategoryCreatePayload,
  HelpdeskSectionCreatePayload,
} from '../interface';

import { fetchQuery } from 'react-relay';
import RelayEnvironment from '@/relay/RelayEnvironment';
import { CategoriesQuery } from '@/relay/__generated__/CategoriesQuery.graphql';
import { categoriesQuery } from '@/relay/CategoriesQuery';

const prefixContact: string = '';

export const endpointContact = {
  GET_ALL_HELPDESK_ARTICLE: `${prefixContact}/helpdesk/articles`,
  CRATE_A_HELPDESK_ARTICLE: `${prefixContact}/helpdesk/articles`,
  UPDATE_A_HELPDESK_ARTICLE: `${prefixContact}/helpdesk/articles/{id}`,
  DELETE_A_HELPDESK_ARTICLE: `${prefixContact}/helpdesk/articles/{id}`,

  // GET_ALL_HELPDESK_CATEGORIES: `${prefixContact}/helpdesk/categories`, // giữ lại nếu cần fallback
  CREATE_A_NEW_HELPDESK_CATEGORY: `${prefixContact}/helpdesk/categories`,
  UPDATE_A_HELPDESK_CATEGORY: `${prefixContact}/helpdesk/categories/{id}`,
  DELETE_A_HELPDESK_CATEGORY: `${prefixContact}/helpdesk/categories/{id}`,

  CREATE_A_HELPDESK_SECTIONS: `${prefixContact}/helpdesk/sections`,
  UPDATE_A_HELPDESK_SECTIONS: `${prefixContact}/helpdesk/sections/{id}`,
  DELETE_A_HELPDESK_SECTIONS: `${prefixContact}/helpdesk/sections/{id}`,
};

// ---------- ARTICLES ----------
export const getAllHelpdeskArticles = async (
  page: number = 1,
  limit: number = 10,
  status: string = '',
  lang: string = 'en'
): Promise<HelpdeskArticleListResponse> => {
  const url = `${endpointContact.GET_ALL_HELPDESK_ARTICLE}?page=${page}&limit=${limit}&status=${status}&lang=${lang}`;
  return await getRequest<HelpdeskArticleListResponse>(url);
};

export const createHelpdeskArticle = async (
  data: HelpdeskArticleCreatePayload
): Promise<any> => {
  return await postRequest(endpointContact.CRATE_A_HELPDESK_ARTICLE, { data, messageSuccess: 'Article created successfully', });
};

export const updateHelpdeskArticle = async (
  id: string,
  data: HelpdeskArticleCreatePayload
): Promise<any> => {
  const url = endpointContact.UPDATE_A_HELPDESK_ARTICLE.replace('{id}', id);
  return await updateRequest(url, { data, messageSuccess: 'Article updated successfully', });
};

export const deleteHelpdeskArticle = async (id: string): Promise<any> => {
  const url = endpointContact.DELETE_A_HELPDESK_ARTICLE.replace('{id}', id);
  return await deleteRequest(url, {messageSuccess: 'Article deleted successfully'});
};

export const getAllHelpdeskCategories = async (): Promise<CategoriesQuery['response']['helpdeskCategories']> => {
  const data = await fetchQuery<CategoriesQuery>(RelayEnvironment, categoriesQuery, {}).toPromise();
  if (!data) throw new Error('No data returned from Relay query.');
  return data.helpdeskCategories;
};

export const createHelpdeskCategory = async (
  data: HelpdeskCategoryCreatePayload
): Promise<any> => {
  return await postRequest(endpointContact.CREATE_A_NEW_HELPDESK_CATEGORY, { data, enableFlashMessageSuccess: false });
};

export const updateHelpdeskCategory = async (
  id: string,
  data: HelpdeskCategoryCreatePayload
): Promise<any> => {
  const url = endpointContact.UPDATE_A_HELPDESK_CATEGORY.replace('{id}', id);
  return await updateRequest(url, { data, messageSuccess: 'Category updated successfully', });
};

export const deleteHelpdeskCategory = async (id: string): Promise<any> => {
  const url = endpointContact.DELETE_A_HELPDESK_CATEGORY.replace('{id}', id);
  return await deleteRequest(url, {messageSuccess: 'Category deleted successfully'});
};

// ---------- SECTIONS ----------
export const createHelpdeskSection = async (
  data: HelpdeskSectionCreatePayload
): Promise<any> => {
  return await postRequest(endpointContact.CREATE_A_HELPDESK_SECTIONS, { data, messageSuccess: 'Section created successfully', });
};

export const updateHelpdeskSection = async (
  id: string,
  data: HelpdeskSectionCreatePayload
): Promise<any> => {
  const url = endpointContact.UPDATE_A_HELPDESK_SECTIONS.replace('{id}', id);
  return await updateRequest(url, { data, messageSuccess: 'Section updated successfully' });
};

export const deleteHelpdeskSection = async (id: string): Promise<any> => {
  const url = endpointContact.DELETE_A_HELPDESK_SECTIONS.replace('{id}', id);
  return await deleteRequest(url, {messageSuccess: 'Section deleted successfully'});
};
