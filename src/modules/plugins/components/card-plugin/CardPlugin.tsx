import { Image, Skeleton, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { useModal } from '@/shared/hooks';
import { CardPluginInterface } from '../../model/allPlugins';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import Typography from '@/shared/components/common/Typography';
import ModalViewDetailPlugin from '../modal-view-detail-plugin/ModalViewDetailPlugin';
import * as S from './CardPlugin.styles';

import icCheckGreen from '@/assets/icons/plugins/ic-check-green.svg';
import icDelete from '@/assets/icons/plugins/ic-delete.svg';
import icImageDefault from '@/assets/icons/common/ic-image-default.jpeg';
import { AppDispatch } from '@/core/store';
import {
  installPluginThunk,
  uninstallPluginThunk,
} from '../../store/pluginsSlice';
import Modal from '@/shared/components/common/Modal';

import icNoitify from '@/assets/icons/contact/ic-notify-contact.svg';
import Button from '@/shared/components/common/Button';
import { ReactSVG } from 'react-svg';

interface CardPluginProps {
  isLoading?: boolean;
  card: CardPluginInterface;
}

function CardPlugin({ isLoading, card }: CardPluginProps) {
  const { t } = useTranslation('plugins');
  const dispatch = useDispatch<AppDispatch>();
  const { visible: viewDetailModal, toggle: handleOpenModalViewDetail } =
    useModal();

  const [loadingInstall, setLoadingInstall] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [loadingRemoveBtn, setLoadingRemoveBtn] = useState(false);

  const toggleRemoveModal = () => {
    setIsRemoveModalOpen((prev) => !prev);
  };

  async function handleInstall() {
    if (!card?.key) return;
    setLoadingInstall(true);
    try {
      await dispatch(installPluginThunk(card.key)).unwrap();
    } catch {
      message.error(t('plugins.installError'));
    } finally {
      setLoadingInstall(false);
    }
  }

  async function handleConfirmRemove() {
    if (!card?.key) return;
    setLoadingRemoveBtn(true);
    try {
      await dispatch(uninstallPluginThunk(card.key)).unwrap();
      toggleRemoveModal();
    } catch {
      message.error(t('plugins.uninstallError'));
    } finally {
      setLoadingRemoveBtn(false);
    }
  }

  function handleView() {
    handleOpenModalViewDetail();
  }

  const renderAction = () => {
    if (!card?.isInstalled) {
      return (
        <S.ActionWrap>
          <S.ButtonConfigure
            onClick={handleInstall}
            type="primary"
            isLoading={loadingInstall}
          >
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
        <S.ButtonDelete onClick={toggleRemoveModal}>
          <ReactSVG src={icDelete} />
        </S.ButtonDelete>
      </S.ActionWrap>
    );
  };

  return (
    <>
      <S.CardPluginsContainer $isInstalled={false}>
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
              style={{
                minWidth: 100,
                width: '100%',
                height: 28,
                marginTop: 14,
              }}
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
              {card?.isInstalled && (
                <Image
                  src={icCheckGreen}
                  width={17}
                  height={17}
                  preview={false}
                />
              )}
              <Typography fontWeight={fontWeight?.semiBold}>
                {card?.name || '--/--'}
              </Typography>
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
      <Modal
        isOpen={isRemoveModalOpen}
        onClose={toggleRemoveModal}
        hideHeader
        width={440}
        children={
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <ReactSVG src={icNoitify} />
            <div>
              <Typography fontWeight={fontWeight?.semiBold} margin="0 0 12px 0">
                Uninstall plugin
              </Typography>
              <Typography color="#5B5B5B">
                Confirm uninstalling the plugin?
              </Typography>
            </div>
          </div>
        }
        footer={
          <S.WrappButton>
            <Button onClick={toggleRemoveModal}>Cancel</Button>
            <Button
              type="danger"
              isLoading={loadingRemoveBtn}
              onClick={handleConfirmRemove}
            >
              Uninstall
            </Button>
          </S.WrappButton>
        }
      />
    </>
  );
}

export default CardPlugin;
