import { useEffect, useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom'; // Dùng useSearchParams thay cho useLocation
import { useDispatch, useSelector } from 'react-redux';

import { pluginTypes } from '../../helpers/data/allPlugins';

import CardPlugin from '../card-plugin/CardPlugin';
import Input from '@/shared/components/common/Input';
import Typography from '@/shared/components/common/Typography';
import * as S from './ListPlugins.styles';
import { fetchInstalledPlugins, fetchPlugins } from '../../store/pluginsSlice';

function Plugins() {
  const { t } = useTranslation('plugins');
  const dispatch = useDispatch();

  const { data: allPlugins, installedPlugins, loading: isLoading } = useSelector(
    (state: any) => state.plugins
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type'); // Lấy param "type" từ url query

  const [typePlugins, setTypePlugins] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value.trim().toLowerCase());
    }, 600),
    []
  );

  const handleSearchPlugins = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

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
      baseList = baseList.filter((plugin) => typePlugins.includes(plugin.type || ''));
    }

    if (searchTerm) {
      baseList = baseList.filter(
        (plugin) =>
          plugin.name.toLowerCase().includes(searchTerm) ||
          (plugin.shortDesc?.toLowerCase().includes(searchTerm) ?? false)
      );
    }

    return baseList;
  }, [typeParam, installedPlugins, allPlugins, typePlugins, searchTerm]);

  function handleFilterPluginsByType(typeKey: string) {
    setTypePlugins((prev) =>
      prev.includes(typeKey) ? prev.filter((item) => item !== typeKey) : [...prev, typeKey]
    );
  }

  return (
    <S.PluginsContainer>
      <Input
        prefix
        placeholder={t('plugins.search')}
        onChange={handleSearchPlugins}
        allowClear
      />
      <S.PluginsTypesContainer>
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
      </S.PluginsTypesContainer>

      <S.Plugins>
        {pluginsToShow.map((card) => (
          <CardPlugin key={card.id || card.key} card={card} isLoading={isLoading} />
        ))}
      </S.Plugins>
    </S.PluginsContainer>
  );
}

export default Plugins;
