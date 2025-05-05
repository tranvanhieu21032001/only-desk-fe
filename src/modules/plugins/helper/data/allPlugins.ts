import {
  CardPluginInterface,
  CategoriesInterface,
  PluginsTypeInterface,
} from '../../model/allPlugins';
import { PluginsStatusEnums, PluginsTypeEnums } from '../enums/allPlugins';

import icBot from '@/assets/icons/plugins/ic-bot.svg';
import icMessage from '@/assets/icons/plugins/ic-message.svg';
import icTrigger from '@/assets/icons/plugins/ic-trigger.svg';

const MAX_COUNT: number = 10;

const categories: CategoriesInterface[] = [
  {
    key: 'features',
    label: 'features',
    count: 2,
  },
  {
    key: 'automation',
    label: 'automation',
    count: 3,
  },
  {
    key: 'cms',
    label: 'cms',
    count: 12,
  },
  {
    key: 'crm',
    label: 'crm',
    count: 16,
  },
  {
    key: 'marketing',
    label: 'marketing',
    count: 6,
  },
  {
    key: 'messaging',
    label: 'messaging',
    count: 5,
  },
  {
    key: 'teamwork',
    label: 'teamwork',
    count: 8,
  },
  {
    key: 'others',
    label: 'others',
    count: 10,
  },
];

const pluginTypes: PluginsTypeInterface[] = [
  {
    key: PluginsTypeEnums?.ESSENTIALS,
    label: 'essentials',
  },
  {
    key: PluginsTypeEnums?.MINI,
    label: 'mini',
  },
  {
    key: PluginsTypeEnums?.FREE,
    label: 'free',
  },
  {
    key: PluginsTypeEnums?.PLUS,
    label: 'plus',
  },
  {
    key: PluginsTypeEnums?.PRICING,
    label: 'pricing',
  },
];

const mockupCardPlugins: CardPluginInterface[] = [
  {
    key: 'bot',
    name: 'Bot',
    description: 'Add a bot to your customer service.',
    type: PluginsTypeEnums?.ESSENTIALS,
    status: PluginsStatusEnums?.INSTALLED,
    icon: icBot,
  },
  {
    key: 'messenger',
    name: 'Messenger',
    description: 'Reply to Facebook Messenger messages from your inbox.',
    type: PluginsTypeEnums?.MINI,
    status: PluginsStatusEnums?.UNINSTALLED,
    icon: icMessage,
  },
  {
    key: 'trigger',
    name: 'Trigger',
    description: 'Allow to perform chatbot actions in an automated way.',
    type: PluginsTypeEnums?.FREE,
    status: PluginsStatusEnums?.INSTALLED,
    icon: icTrigger,
  },
  {
    key: 'salesforce',
    name: 'Salesforce',
    description:
      'Sync your contacts between Salesforce and OnlyChat automatically.',
    type: PluginsTypeEnums?.PLUS,
    status: PluginsStatusEnums?.UNINSTALLED,
    icon: icBot,
  },
  {
    key: 'pipedrive',
    name: 'Pipedrive',
    description: 'OnlyChat and Helpdesk for Pipedrive CRM.',
    type: PluginsTypeEnums?.PRICING,
    status: PluginsStatusEnums?.INSTALLED,
    icon: icBot,
  },
  {
    key: 'zapier',
    name: 'Zapier',
    description: 'Easy automation for busy people.',
    type: PluginsTypeEnums?.ESSENTIALS,
    status: PluginsStatusEnums?.UNINSTALLED,
    icon: icTrigger,
  },
  {
    key: 'bot',
    name: 'Bot',
    description: 'Add a bot to your customer service.',
    type: PluginsTypeEnums?.ESSENTIALS,
    status: PluginsStatusEnums?.INSTALLED,
    icon: icBot,
  },
  {
    key: 'messenger',
    name: 'Messenger',
    description: 'Reply to Facebook Messenger messages from your inbox.',
    type: PluginsTypeEnums?.MINI,
    status: PluginsStatusEnums?.UNINSTALLED,
    icon: icMessage,
  },
  {
    key: 'trigger',
    name: 'Trigger',
    description: 'Allow to perform chatbot actions in an automated way.',
    type: PluginsTypeEnums?.FREE,
    status: PluginsStatusEnums?.INSTALLED,
    icon: icTrigger,
  },
  {
    key: 'salesforce',
    name: 'Salesforce',
    description:
      'Sync your contacts between Salesforce and OnlyChat automatically.',
    type: PluginsTypeEnums?.PLUS,
    status: PluginsStatusEnums?.UNINSTALLED,
    icon: icBot,
  },
  {
    key: 'pipedrive',
    name: 'Pipedrive',
    description: 'OnlyChat and Helpdesk for Pipedrive CRM.',
    type: PluginsTypeEnums?.PRICING,
    status: PluginsStatusEnums?.INSTALLED,
    icon: icBot,
  },
  {
    key: 'zapier',
    name: 'Zapier',
    description: 'Easy automation for busy people.',
    type: PluginsTypeEnums?.ESSENTIALS,
    status: PluginsStatusEnums?.UNINSTALLED,
    icon: icTrigger,
  },
];

export { categories, MAX_COUNT, pluginTypes, mockupCardPlugins };
