import { getRequest, postRequest } from "@/core/services/requests";
import { HelpdeskArticleListResponse, HelpdeskCategoryCreatePayload } from "../interface";

const prefixContact: string = '';

export const endpointContact = {
  GET_ALL_HELPDESK_ARTICLE: `${prefixContact}/helpdesk/articles`,
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