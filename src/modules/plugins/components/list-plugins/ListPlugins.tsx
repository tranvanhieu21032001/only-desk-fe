import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import { getAllPlugins, getInstalledPlugins } from '../../api/plugin.api';
import { PAGE_SIZE } from '@/shared/constant/common';
import { pluginTypes } from '../../helpers/data/allPlugins';

import CardPlugin from '../card-plugin/CardPlugin';
import Input from '@/shared/components/common/Input';
import Typography from '@/shared/components/common/Typography';

import * as S from './ListPlugins.styles';

function Plugins() {
  const { t } = useTranslation('plugins');
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [typePlugins, setTypePlugins] = useState<string[]>([]);
  const [plugins, setPlugins] = useState<any[]>([]);

  const handleSearchPlugins = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //TODO handle search
      e?.target?.value;
    },
    600
  );

  useEffect(() => {
    const fetchPlugins = async () => {
      try {
        const isInstalledPage = location.pathname === '/installed-plugins';

        let data;
        if (isInstalledPage) {
          const installed = await getInstalledPlugins();
          data = installed.map((plugin) => ({ node: plugin }));
        } else {
          const all = await getAllPlugins({ first: PAGE_SIZE });
          data = all?.edges || [];
        }

        setPlugins(data);
      } catch (error) {
        console.error('Failed to fetch plugins:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlugins();
  }, [location.pathname]);

  function handleFilterPluginsByType(e: string) {
    setTypePlugins((prev) =>
      prev?.includes(e) ? prev?.filter((item) => item !== e) : [...prev, e]
    );
  }

  return (
    <S.PluginsContainer>
      <Input
        prefix
        placeholder={t('plugins.search')}
        onChange={handleSearchPlugins}
      />
      <S.PluginsTypesContainer>
        {isLoading
          ? Array(5)
              ?.fill(0)
              ?.map((_, index: number) => (
                <S.SkeletonContainer active key={index} />
              ))
          : pluginTypes?.map((pluginType) => (
              <S.PluginType
                $type={pluginType?.key}
                key={pluginType?.key}
                onClick={() => handleFilterPluginsByType(pluginType?.key)}
              >
                <Typography>{t(`plugins.${pluginType?.label}`)} </Typography>
                {typePlugins?.includes(pluginType?.key) && (
                  <CheckCircleOutlined />
                )}
              </S.PluginType>
            ))}
      </S.PluginsTypesContainer>

      <S.Plugins>
        {plugins?.map((card) => (
          <CardPlugin
            key={card?.node?.id || card?.node?.key}
            card={card?.node}
            isLoading={isLoading}
          />
        ))}
      </S.Plugins>
    </S.PluginsContainer>
  );
}

export default Plugins;
