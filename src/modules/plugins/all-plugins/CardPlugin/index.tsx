import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EyeOutlined, SettingFilled } from '@ant-design/icons';

import { useModal } from '@/shared/hooks';
import { CardPluginInterface } from '../../model/allPlugins';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { PluginsStatusEnums } from '../../helper/enums/allPlugins';

import ModalViewDetailPlugin from '../ModalViewDetailPlugin';
import Typography from '@/shared/components/common/Typography';

import * as S from './card-plugin';

import icCheckGreen from '@/assets/icons/plugins/ic-check-green.svg';
import icImageDefault from '@/assets/icons/common/ic-image-default.jpeg';

interface CardPluginProps {
  isLoading?: boolean;
  card: CardPluginInterface;
}

function CardPlugin({ isLoading, card }: CardPluginProps) {
  const { t } = useTranslation('plugins');
  const { visible: viewDetailModal, toggle: handleOpenModalViewDetail } =
    useModal();

  function handleViewDetail() {
    handleOpenModalViewDetail();
  }

  function handleConfigure() {
    //TODO handle later
  }

  function handleView() {
    handleOpenModalViewDetail();
  }

  function handleDeletePlugin() {
    //TODO handle later
  }

  const renderAction = () => {
    if (card?.status === PluginsStatusEnums?.UNINSTALLED) {
      return (
        <S.ButtonViewDetail onClick={handleViewDetail}>
          <EyeOutlined />
          <Typography fontWeight={fontWeight?.semiBold}>
            {t('plugins.view-detail')}
          </Typography>
        </S.ButtonViewDetail>
      );
    }
    return (
      <S.ActionWrap>
        <S.ButtonConfigure onClick={handleConfigure} type="primary">
          <SettingFilled />
          <Typography
            color={themeColors?.newtralLightest}
            fontWeight={fontWeight?.semiBold}
          >
            {t('plugins.configure')}
          </Typography>
        </S.ButtonConfigure>
        <S.ButtonView onClick={handleView}>
          <EyeOutlined />
          <Typography fontWeight={fontWeight?.semiBold}>
            {t('plugins.view-detail')}
          </Typography>
        </S.ButtonView>
        <S.ButtonDelete onClick={handleDeletePlugin}>
          <DeleteOutlined />
        </S.ButtonDelete>
      </S.ActionWrap>
    );
  };

  return (
    <S.CardPluginsContainer
      $isInstalled={card?.status === PluginsStatusEnums?.INSTALLED}
    >
      {isLoading ? (
        <S.CardPluginSkeleton>
          <S.CardHeader>
            <Skeleton.Image active style={{ width: 60, height: 60 }} />
            <Skeleton.Input
              active
              style={{ minWidth: 30, height: 28, width: 80 }}
            />
          </S.CardHeader>
          <Skeleton.Input
            active
            style={{ minWidth: 100, width: 100, height: 28, marginTop: 14 }}
          />
          <Skeleton.Input
            active
            style={{ minWidth: 250, width: 250, height: 40, marginTop: 4 }}
          />
          <Skeleton.Input
            active
            style={{ minWidth: 100, width: '100%', height: 28, marginTop: 14 }}
          />
        </S.CardPluginSkeleton>
      ) : (
        <S.CardPlugin>
          <S.CardHeader>
            <Image
              src={card?.icon || icImageDefault}
              width={60}
              height={60}
              onError={(e) => {
                e.currentTarget.src = icImageDefault;
              }}
              preview={false}
            />

            <S.PluginType $type={card?.type}>
              <Typography textAlign="center">
                {t(`plugins.${card?.type}`)}
              </Typography>
            </S.PluginType>
          </S.CardHeader>
          <S.NamePlugin>
            <Typography fontWeight={fontWeight?.semiBold}>
              {card?.name || '--/--'}
            </Typography>
            {card?.status === PluginsStatusEnums?.INSTALLED && (
              <S.Status>
                <Image
                  src={icCheckGreen}
                  width={17}
                  height={17}
                  preview={false}
                />
                <Typography>{t('plugins.installed')}</Typography>
              </S.Status>
            )}
          </S.NamePlugin>
          <S.Description>
            <Typography>{card?.description || '--/--'}</Typography>
          </S.Description>
          {renderAction()}
        </S.CardPlugin>
      )}

      {viewDetailModal && (
        <ModalViewDetailPlugin
          open={viewDetailModal}
          onCancel={handleOpenModalViewDetail}
          card={card}
        />
      )}
    </S.CardPluginsContainer>
  );
}

export default CardPlugin;
