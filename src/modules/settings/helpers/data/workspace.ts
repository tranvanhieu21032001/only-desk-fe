import {
  WorkspaceIntegrationsInterface,
  WorkspaceMenuInterface,
} from '../../models/workspace.model';
import { WorkspaceMenusEnums } from '../enums/workspace';

import icIntegrationMockup from '@/assets/icons/workspace/ic-integration-mockup.svg';
import icIntegrationMockup1 from '@/assets/icons/workspace/ic-integration-mockup1.svg';
import icIntegrationMockup2 from '@/assets/icons/workspace/ic-integration-mockup2.svg';
import icIntegrationMockup3 from '@/assets/icons/workspace/ic-integration-mockup3.svg';
import icIntegrationMockup4 from '@/assets/icons/workspace/ic-integration-mockup4.svg';
import icIntegrationMockup5 from '@/assets/icons/workspace/ic-integration-mockup5.svg';
import icIntegrationMockup6 from '@/assets/icons/workspace/ic-integration-mockup6.svg';
import icIntegrationMockup7 from '@/assets/icons/workspace/ic-integration-mockup7.svg';
import icIntegrationMockup8 from '@/assets/icons/workspace/ic-integration-mockup8.svg';
import icIntegrationMockup9 from '@/assets/icons/workspace/ic-integration-mockup9.svg';
import icIntegrationMockup10 from '@/assets/icons/workspace/ic-integration-mockup10.svg';
import icIntegrationMockup11 from '@/assets/icons/workspace/ic-integration-mockup11.svg';
import icIntegrationMockup12 from '@/assets/icons/workspace/ic-integration-mockup12.svg';
import icIntegrationMockup13 from '@/assets/icons/workspace/ic-integration-mockup13.svg';
import icIntegrationMockup14 from '@/assets/icons/workspace/ic-integration-mockup14.svg';

const workspaceMenus: WorkspaceMenuInterface[] = [
  {
    key: WorkspaceMenusEnums?.WORKSPACE_INFORMATION,
    label: 'workspace-informations',
  },
  {
    key: WorkspaceMenusEnums?.SETUP_INTEGRATIONS,
    label: 'setup-integrations',
  },
  {
    key: WorkspaceMenusEnums?.OPERATOR_TEAMS,
    label: 'operator-teams',
  },
  {
    key: WorkspaceMenusEnums?.BILLING_SETTINGS,
    label: 'billing-settings',
  },
  {
    key: WorkspaceMenusEnums?.TEAM_TRANSPARENCY_LOG,
    label: 'team-transparency-log',
  },
  {
    key: WorkspaceMenusEnums?.ADVANCED_CONFIGURATION,
    label: 'advanced-configuration',
  },
  {
    key: WorkspaceMenusEnums?.DATA_LIMIT_LEGAL,
    label: 'data-limits-legal',
  },
  {
    key: WorkspaceMenusEnums?.DANGER_ZONE,
    label: 'danger-zone',
  },
];

const workspaceIntegrations: WorkspaceIntegrationsInterface[] = [
  {
    key: 'website',
    label: 'Website',
    children: [
      {
        key: 'HTML',
        label: 'HTML',
        logo: icIntegrationMockup,
      },
      {
        key: 'WorkPress',
        label: 'HTWorkPressML',
        logo: icIntegrationMockup1,
      },
      {
        key: 'Shopify',
        label: 'Shopify',
        logo: icIntegrationMockup2,
      },
      {
        key: 'Prestashop',
        label: 'Prestashop',
        logo: icIntegrationMockup3,
      },
      {
        key: 'WooCommerce',
        label: 'WooCommerce',
        logo: icIntegrationMockup4,
      },
      {
        key: 'WHMCS',
        label: 'WHMCS',
        logo: icIntegrationMockup5,
      },
    ],
  },
  {
    key: 'Email',
    label: 'Email',
    children: [
      {
        key: 'GMail',
        label: 'GMail',
        logo: icIntegrationMockup6,
      },
      {
        key: 'Outlook',
        label: 'Outlook',
        logo: icIntegrationMockup7,
      },
    ],
  },
  {
    key: 'Messaging Plugins',
    label: 'Messaging Plugins',
    children: [
      {
        key: 'Instagram',
        label: 'Instagram',
        logo: icIntegrationMockup8,
      },
      {
        key: 'Messenger',
        label: 'Messenger',
        logo: icIntegrationMockup9,
      },
      {
        key: 'Slack',
        label: 'Slack',
        logo: icIntegrationMockup10,
      },
      {
        key: 'Telegram',
        label: 'Telegram',
        logo: icIntegrationMockup11,
      },
    ],
  },
  {
    key: 'Native Apps & SDKs',
    label: 'Native Apps & SDKs',
    children: [
      {
        key: 'IOS SDK',
        label: 'IOS SDK',
        logo: icIntegrationMockup12,
      },
      {
        key: 'Android SDK',
        label: 'Android SDK',
        logo: icIntegrationMockup13,
      },
      {
        key: 'react-native-sdk',
        label: 'React Native SDK',
        logo: icIntegrationMockup14,
      },
    ],
  },
];

export { workspaceMenus, workspaceIntegrations };
