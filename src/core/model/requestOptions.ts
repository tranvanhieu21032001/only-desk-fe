export interface RequestOptionsInterface {
  data?: object;
  params?: object;
  isFormData?: boolean;
  enableFlashMessageSuccess?: boolean;
  enableFlashMessageError?: boolean;
  messageSuccess?: string;
  messageError?: string;
}

export interface ParamsInterface {
  limit?: number;
  page?: number;
  page_size?: number;
  search?: string;
  populate?: string;
  sort?: string;
  filter?: string;
  branch_office?: string;
  head_office?: string;
}
