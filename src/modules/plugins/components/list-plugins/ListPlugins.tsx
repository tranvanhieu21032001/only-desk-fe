import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CardPlugin from '../card-plugin/CardPlugin';
import Input from '@/shared/components/common/Input';
import * as S from './ListPlugins.styles';
import { fetchInstalledPlugins, fetchPlugins } from '../../store/pluginsSlice';
import empty from '@/assets/images/contact/img-contact-empty.png';
import { Image, Skeleton } from 'antd';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import { AppDispatch } from '@/core/store';

function Plugins() {
  const { t } = useTranslation('plugins');
  const dispatch = useDispatch<AppDispatch>();

  const { data: allPlugins, installedPlugins, loading: isLoading } = useSelector(
    (state: any) => state.plugins
  );

  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');

  const [typePlugins, _setTypePlugins] = useState<string[]>([]);

  useEffect(() => {
    if (typeParam === 'installed-plugins') {
      dispatch(fetchInstalledPlugins());
    } else {
      dispatch(fetchPlugins());
    }
  }, [dispatch, typeParam]);

  const pluginsToShow = useMemo(() => {
    const isInstalledPage = typeParam === 'installed-plugins';
    let baseList = isInstalledPage ? installedPlugins : allPlugins;
    if (typePlugins.length > 0) {
      baseList = baseList.filter((plugin: any) => typePlugins.includes(plugin.type || ''));
    }


    return baseList;
  }, [typeParam, installedPlugins, allPlugins, typePlugins]);

  const handleSearchPlugins = () => {};

  return (
    <S.PluginsContainer>
      <Input
        prefix
        placeholder={t('plugins.search')}
        onChange={handleSearchPlugins} 
        allowClear
      />

      {/* <S.PluginsTypesContainer>
        {isLoading
          ? Array(5)
              .fill(0)
              .map((_, index) => <S.SkeletonContainer active key={index} />)
          : pluginTypes.map((pluginType) => (
              <S.PluginType
                $type={pluginType.key}
                key={pluginType.key}
                onClick={() => handleFilterPluginsByType(pluginType.key)}
              >
                <Typography>{t(`plugins.${pluginType.label}`)}</Typography>
                {typePlugins.includes(pluginType.key) && <CheckCircleOutlined />}
              </S.PluginType>
            ))}
      </S.PluginsTypesContainer> */}

      {isLoading ? (
        <S.Plugins>
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <Skeleton.Input
                key={idx}
                active
                style={{ width: '100%', height: 100, marginBottom: 16 }}
              />
            ))}
        </S.Plugins>
      ) : pluginsToShow.length === 0 ? (
        <S.EmptyWrap>
          <Image src={empty} preview={false} />
          <Typography variant="h3" margin="8px 0 0 0" color={themeColors?.primary}>
            No plugins found
          </Typography>
        </S.EmptyWrap>
      ) : (
        <S.Plugins>
          {pluginsToShow.map((card: any) => (
            <CardPlugin key={card.id || card.key} card={card} isLoading={isLoading} />
          ))}
        </S.Plugins>
      )}
    </S.PluginsContainer>
  );
}

export default Plugins;
