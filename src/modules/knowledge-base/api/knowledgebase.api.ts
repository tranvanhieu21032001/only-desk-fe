import { deleteRequest, getRequest, postRequest, updateRequest } from "@/core/services/requests";
import { HelpdeskArticleCreatePayload, HelpdeskArticleListResponse, HelpdeskCategory, HelpdeskCategoryCreatePayload, HelpdeskSectionCreatePayload } from "../interface";

const prefixContact: string = '';

export const endpointContact = {
  GET_ALL_HELPDESK_ARTICLE: `${prefixContact}/helpdesk/articles`,
  CRATE_A_HELPDESK_ARTICLE: `${prefixContact}/helpdesk/articles`,
  UPDATE_A_HELPDESK_ARTICLE: `${prefixContact}/helpdesk/articles/{id}`,
  DELETE_A_HELPDESK_ARTICLE: `${prefixContact}/helpdesk/articles/{id}`,
  GET_ALL_HELPDESK_CATEGORIES: `${prefixContact}/helpdesk/categories`,
  CREATE_A_NEW_HELPDESK_CATEGORY: `${prefixContact}/helpdesk/categories`,
  UPDATE_A_HELPDESK_CATEGORY: `${prefixContact}/helpdesk/categories/{id}`,
  DELETE_A_HELPDESK_CATEGORY: `${prefixContact}/helpdesk/categories/{id}`,
  CREATE_A_HELPDESK_SECTIONS: `${prefixContact}/helpdesk/sections`,
  UPDATE_A_HELPDESK_SECTIONS: `${prefixContact}/helpdesk/sections/{id}`,
  DELETE_A_HELPDESK_SECTIONS: `${prefixContact}/helpdesk/sections/{id}`,
};

export const getAllHelpdeskArticles = async (
  page: number = 1,
  limit: number = 10,
  status: string = '',
  lang: string = 'en'
): Promise<HelpdeskArticleListResponse> => {
  const url = `${endpointContact.GET_ALL_HELPDESK_ARTICLE}?page=${page}&limit=${limit}&status=${status}&lang=${lang}`;
  const response = await getRequest<HelpdeskArticleListResponse>(url);
  return response;
};


export const createHelpdeskCategory = async (
  data: HelpdeskCategoryCreatePayload
): Promise<any> => {
  return await postRequest(endpointContact.CREATE_A_NEW_HELPDESK_CATEGORY, {
    data,
  });
};


export const createHelpdeskArticle = async (
  data: HelpdeskArticleCreatePayload
): Promise<any> => {
  return await postRequest(endpointContact.CRATE_A_HELPDESK_ARTICLE, {
    data,
  });
};

// services.ts
export const getAllHelpdeskCategories = async (): Promise<HelpdeskCategory[]> => {
  const url = endpointContact.GET_ALL_HELPDESK_CATEGORIES;
  const response = await getRequest<any[]>(url);
  return response;
};

export const updateHelpdeskArticle = async (
  id: string,
  data: HelpdeskArticleCreatePayload
): Promise<any> => {
  const url = endpointContact.UPDATE_A_HELPDESK_ARTICLE.replace('{id}', id);
  return await updateRequest(url, { data });
};



export const deleteHelpdeskArticle = async (id: string): Promise<any> => {
  const url = endpointContact.DELETE_A_HELPDESK_ARTICLE.replace('{id}', id);
  return await deleteRequest(url);
};


export const createHelpdeskSection = async (
  data: HelpdeskSectionCreatePayload
): Promise<any> => {
  return await postRequest(endpointContact.CREATE_A_HELPDESK_SECTIONS, {
    data,
  });
};
