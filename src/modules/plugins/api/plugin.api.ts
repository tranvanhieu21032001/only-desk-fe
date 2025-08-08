import { fetchQuery } from 'react-relay';
import RelayEnvironment from '@/relay/RelayEnvironment';
import { AllpluginsQuery } from '@/relay/__generated__/AllpluginsQuery.graphql';
import { allPluginsQuery } from '@/relay/AllpluginsQuery';
import { PluginDetailQuery } from '@/relay/__generated__/PluginDetailQuery.graphql';
import { pluginDetailQuery } from '@/relay/PluginDetailQuery';
import { InstalledPluginQuery } from '@/relay/__generated__/InstalledPluginQuery.graphql';
import { installedPluginQuery } from '@/relay/InstalledpluginQuery';

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

export const getPluginDetail = async (
  id: string
): Promise<PluginDetailQuery['response']['node']> => {
  const data = await fetchQuery<PluginDetailQuery>(
    RelayEnvironment,
    pluginDetailQuery,
    { id }
  ).toPromise();

  if (!data || !data.node) {
    throw new Error('No plugin data returned for given ID.');
  }

  return data.node;
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
