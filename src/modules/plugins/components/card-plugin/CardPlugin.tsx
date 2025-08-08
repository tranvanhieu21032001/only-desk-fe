import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { useModal } from '@/shared/hooks';
import { CardPluginInterface } from '../../model/allPlugins';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Typography from '@/shared/components/common/Typography';
import ModalViewDetailPlugin from '../modal-view-detail-plugin/ModalViewDetailPlugin';

import * as S from './CardPlugin.styles';

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
    if (!card?.isInstalled) {
      return (
        <S.ActionWrap>
          <S.ButtonConfigure onClick={handleConfigure} type="primary">
            <PlusCircleOutlined />
            <Typography
              color={themeColors?.newtralLightest}
              fontWeight={fontWeight?.semiBold}
            >
              {t('plugins.install')}
            </Typography>
          </S.ButtonConfigure>
          <S.ButtonView onClick={handleView}>
            <EyeOutlined />
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('plugins.view')}
            </Typography>
          </S.ButtonView>
        </S.ActionWrap>
      );
    }

    return (
      <S.ActionWrap>
        <S.ButtonView onClick={handleView}>
          <EyeOutlined />
          <Typography fontWeight={fontWeight?.semiBold}>
            {t('plugins.view')}
          </Typography>
        </S.ButtonView>
        <S.ButtonDelete onClick={handleDeletePlugin}>
          <DeleteOutlined />
        </S.ButtonDelete>
      </S.ActionWrap>
    );
  };

  return (
    <S.CardPluginsContainer $isInstalled={card?.isInstalled ?? false}>
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
              src={card?.iconUrl || icImageDefault}
              width={60}
              height={60}
              onError={(e) => {
                e.currentTarget.src = icImageDefault;
              }}
              preview={false}
            />
            {card?.type && (
              <S.PluginType $type={card.type}>
                <Typography textAlign="center">{card.type}</Typography>
              </S.PluginType>
            )}
          </S.CardHeader>

          <S.NamePlugin>
            <Typography fontWeight={fontWeight?.semiBold}>
              {card?.name || '--/--'}
            </Typography>
            {card?.isInstalled && (
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
            <Typography>{card?.shortDesc || '--/--'}</Typography>
          </S.Description>

          {renderAction()}
        </S.CardPlugin>
      )}

      {viewDetailModal && (
        <ModalViewDetailPlugin
          open={viewDetailModal}
          onCancel={handleOpenModalViewDetail}
          cardId={card?.id}
        />
      )}
    </S.CardPluginsContainer>
  );
}

export default CardPlugin;
