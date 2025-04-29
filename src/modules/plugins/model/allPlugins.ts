import { PluginsStatusEnums, PluginsTypeEnums } from "../helper/enums/allPlugins";

export interface CategoriesInterface{
    key: string;
    label: string;
    count: number;
}

export interface PluginsTypeInterface { 
    key: PluginsTypeEnums;
    label: string;
}

export interface CardPluginInterface{
    key: string;
    icon: string;
    name: string;
    description: string;
    type: PluginsTypeEnums;
    status: PluginsStatusEnums;
}