import {
  // CardPluginInterface,
  CategoriesInterface,
  PluginsTypeInterface,
} from '../../model/allPlugins';
import { PluginsTypeEnums } from '../enums/allPlugins';

// import icBot from '@/assets/icons/plugins/ic-bot.svg';
// import icMessage from '@/assets/icons/plugins/ic-message.svg';
// import icTrigger from '@/assets/icons/plugins/ic-trigger.svg';

const MAX_COUNT: number = 10;

const categories: CategoriesInterface[] = [
  {
    key: 'all-plugins',
    label: 'all-plugins',
    count: 2,
  },
  {
    key: 'installed-plugins',
    label: 'installed-plugins',
    count: 3,
  },
  // {
  //   key: 'features',
  //   label: 'features',
  //   count: 2,
  // },
  // {
  //   key: 'automation',
  //   label: 'automation',
  //   count: 3,
  // },
  // {
  //   key: 'cms',
  //   label: 'cms',
  //   count: 12,
  // },
  // {
  //   key: 'crm',
  //   label: 'crm',
  //   count: 16,
  // },
  // {
  //   key: 'marketing',
  //   label: 'marketing',
  //   count: 6,
  // },
  // {
  //   key: 'messaging',
  //   label: 'messaging',
  //   count: 5,
  // },
  // {
  //   key: 'teamwork',
  //   label: 'teamwork',
  //   count: 8,
  // },
  // {
  //   key: 'others',
  //   label: 'others',
  //   count: 10,
  // },
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



export { categories, MAX_COUNT, pluginTypes };
