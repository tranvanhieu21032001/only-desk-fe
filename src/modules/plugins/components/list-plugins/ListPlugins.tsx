import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { CheckCircleOutlined } from '@ant-design/icons';

import { mockupCardPlugins, pluginTypes } from '../../helper/data/allPlugins';

import CardPlugin from '../card-plugin/CardPlugin';
import Input from '@/shared/components/common/Input';
import Typography from '@/shared/components/common/Typography';

import * as S from './ListPlugins.styles';

function Plugins() {
  const { t } = useTranslation('plugins');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [typePlugins, setTypePlugins] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchPlugins = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //TODO handle later
      e?.target?.value;
    },
    600,
  );

  function handleFilterPluginsByType(e: string) {
    setTypePlugins((prev) => {
      if (prev?.includes(e)) {
        return prev?.filter((item) => item !== e);
      } else {
        return [...prev, e];
      }
    });
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
        {mockupCardPlugins?.map((card) => (
          <CardPlugin key={card?.key} card={card} isLoading={isLoading} />
        ))}
      </S.Plugins>
    </S.PluginsContainer>
  );
}

export default Plugins;
