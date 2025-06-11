import { getRequest, postRequest } from "@/core/services/requests";
import { HelpdeskArticleCreatePayload, HelpdeskArticleListResponse, HelpdeskCategory, HelpdeskCategoryCreatePayload } from "../interface";

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
};

export const getAllHelpdeskArticles = async (
  page: number = 1,
  limit: number = 10
): Promise<HelpdeskArticleListResponse> => {
  const url = `${endpointContact.GET_ALL_HELPDESK_ARTICLE}?page=${page}&limit=${limit}`;
  const response = await getRequest<HelpdeskArticleListResponse>(url);
  console.log("response", response);

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

  const filtered = response.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return filtered;
};
