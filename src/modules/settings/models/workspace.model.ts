import { WorkspaceMenusEnums } from '../helpers/enums/workspace';

export interface WorkspaceMenuInterface {
  key: WorkspaceMenusEnums;
  label: string;
}

export interface IntegrationInterface {
  key: string;
  label: string;
  logo?: string;
}

export interface WorkspaceIntegrationsInterface {
  key: string;
  label: string;
  children?: IntegrationInterface[];
}
