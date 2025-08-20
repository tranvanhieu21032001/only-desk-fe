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
  // {
  //   key: WorkspaceMenusEnums?.BILLING_SETTINGS,
  //   label: 'billing-settings',
  // },
  // {
  //   key: WorkspaceMenusEnums?.TEAM_TRANSPARENCY_LOG,
  //   label: 'team-transparency-log',
  // },
  // {
  //   key: WorkspaceMenusEnums?.ADVANCED_CONFIGURATION,
  //   label: 'advanced-configuration',
  // },
  // {
  //   key: WorkspaceMenusEnums?.DATA_LIMIT_LEGAL,
  //   label: 'data-limits-legal',
  // },
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
];

export { workspaceMenus, workspaceIntegrations };
