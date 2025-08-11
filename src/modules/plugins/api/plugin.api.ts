import { fetchQuery } from 'react-relay';
import RelayEnvironment from '@/relay/RelayEnvironment';
import { AllpluginsQuery } from '@/relay/__generated__/AllpluginsQuery.graphql';
import { allPluginsQuery } from '@/relay/AllpluginsQuery';
import { PluginDetailQuery } from '@/relay/__generated__/PluginDetailQuery.graphql';
import { pluginDetailQuery } from '@/relay/PluginDetailQuery';
import { InstalledPluginQuery } from '@/relay/__generated__/InstalledPluginQuery.graphql';
import { installedPluginQuery } from '@/relay/InstalledPluginQuery';
import { deleteRequest, postRequest } from '@/core/services/requests';

const prefixBase = '';
export const ENDPOINT = {
  INSTALL_PLUGIN: `${prefixBase}/plugins`,
  UNINSTALL_PLUGIN: `${prefixBase}/plugins`,
};
export interface PluginDetail {
  id: string;
  rawId?: string;
  key: string;
  name: string;
  type?: string;
  desc?: string;
  version?: string;
  category?: string;
  iconUrl?: string;
  isInstalled?: boolean;
  author?: {
    name?: string | null;
    photo?: string | null;
    domain?: string | null;
  } | null;
  __typename?: string;
}

export const getAllPlugins = async (variables: {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}): Promise<AllpluginsQuery['response']['plugins']> => {
  const data = await fetchQuery<AllpluginsQuery>(
    RelayEnvironment,
    allPluginsQuery,
    variables
  ).toPromise();

  if (!data) {
    throw new Error('No data returned from allPluginsQuery.');
  }

  return data.plugins;
};

export const getPluginDetail = async (id: string): Promise<PluginDetail> => {
  const data = await fetchQuery<PluginDetailQuery>(
    RelayEnvironment,
    pluginDetailQuery,
    { id }
  ).toPromise();

  if (!data || !data.node) {
    throw new Error('No plugin data returned for given ID.');
  }

  return data.node as PluginDetail;
};

export const getInstalledPlugins = async (): Promise<
  InstalledPluginQuery['response']['installedPlugins']
> => {
  const data = await fetchQuery<InstalledPluginQuery>(
    RelayEnvironment,
    installedPluginQuery,
    {}
  ).toPromise();

  if (!data || !data.installedPlugins) {
    throw new Error('No data returned from installedPluginQuery.');
  }

  return data.installedPlugins;
};


export const installPlugin = async (pluginKey: string) => {
  return postRequest(ENDPOINT.INSTALL_PLUGIN, {
    data: {
      pluginKey,
    },
     messageSuccess:'Plugin installed successfully',
    enableFlashMessageError: true,
  });
};

export const uninstallPlugin = async (pluginKey: string) => {
  return deleteRequest(`${ENDPOINT.UNINSTALL_PLUGIN}/${pluginKey}/uninstall`, {
    messageSuccess:'Plugin uninstalled successfully',
    enableFlashMessageError: true,
  });
};
