import {
  PluginsStatusEnums,
  PluginsTypeEnums,
} from '../helpers/enums/allPlugins';

export interface CategoriesInterface {
  key: string;
  label: string;
  count: number;
}

export interface PluginsTypeInterface {
  key: PluginsTypeEnums;
  label: string;
}

export interface CardPluginInterface {
  id?: string;
  key?: string;
  name?: string;
  iconUrl?: string;
  docUrl?: string;
  isInstalled?: boolean;
  category?: string;
  shortDesc?: string;
  desc?: string;
  type?: PluginsTypeEnums;
  status?: PluginsStatusEnums;
  author?: {
    name?: string;
    photo?: string;
    domain?: string;
  };
}
