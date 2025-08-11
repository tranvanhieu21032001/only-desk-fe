import { useEffect, useState } from 'react';
import { Col, Image, message, Modal, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined, SettingFilled } from '@ant-design/icons';

import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';
import * as S from './ModalViewDetailPlugin.styles';

import icVideo from '@/assets/icons/plugins/ic-video.svg';
import icDocument from '@/assets/icons/plugins/ic-document.svg';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import icNoitify from '@/assets/icons/contact/ic-notify-contact.svg';

import { ReactSVG } from 'react-svg';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import Button from '@/shared/components/common/Button';

import {
  fetchPluginDetail,
  installPluginThunk,
  uninstallPluginThunk,
} from '../../store/pluginsSlice';

interface ModalViewDetailPluginProps {
  open: boolean;
  onCancel: () => void;
  cardId?: string;
}

function ModalViewDetailPlugin({
  open,
  onCancel,
  cardId,
}: ModalViewDetailPluginProps) {
  const { t } = useTranslation('plugins');
  const dispatch = useAppDispatch();

  const card = useAppSelector((state) => state.plugins.detail);
  const isLoading = useAppSelector((state) => state.plugins.detailLoading);
  const error = useAppSelector((state) => state.plugins.detailError);

  const [loadingInstall, setLoadingInstall] = useState(false);

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [loadingRemoveBtn, setLoadingRemoveBtn] = useState(false);

  useEffect(() => {
    if (open && cardId) {
      dispatch(fetchPluginDetail(cardId));
    }
  }, [open, cardId, dispatch]);

  function handleViewVideo() {
    // TODO handle later
  }

  function handleViewDocument() {
    // TODO handle later
  }

  // Cài plugin
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

  // Gỡ plugin thật sự (gọi API)
  async function handleUninstall() {
    if (!card?.key) return;
    setLoadingRemoveBtn(true);
    try {
      await dispatch(uninstallPluginThunk(card.key)).unwrap();
      setIsRemoveModalOpen(false);
    } catch {
      message.error(t('plugins.uninstallError'));
    } finally {
      setLoadingRemoveBtn(false);
    }
  }

  // Mở modal xác nhận khi bấm nút Uninstall
  function handleOpenRemoveModal() {
    setIsRemoveModalOpen(true);
  }

  // Đóng modal xác nhận
  function toggleRemoveModal() {
    setIsRemoveModalOpen(false);
  }

  function handleConfigure() {
    // TODO handle later
  }

  return (
    <>
      <S.WrapModal>
        <ModalCommon
          open={open}
          onCancel={onCancel}
          showFooter={false}
          isLoading={isLoading}
          width={1050}
        >
          <S.ModalHeader>
            <S.ModalHeaderContent>
              <Typography fontWeight={600}>
                {t('modal-view-detail-plugin.plugins')}
              </Typography>
              <Typography color="#999">
                {t('modal-view-detail-plugin.please-insert-modal-description')}
              </Typography>
            </S.ModalHeaderContent>
          </S.ModalHeader>

          <S.ModalContent>
            {isLoading ? (
              <S.ContentHeader gutter={[72, 16]}>
                {/* ...skeleton loading như cũ */}
              </S.ContentHeader>
            ) : error ? (
              <div>{t('modal-view-detail-plugin.error-loading-plugin')}</div>
            ) : (
              <S.ContentHeader gutter={[72, 16]}>
                <Col xs={24} md={12}>
                  <S.LogoPlugin>
                    <Image
                      src={card?.iconUrl}
                      width={130}
                      height={130}
                      preview={false}
                    />
                    <S.InfoPlugin>
                      <S.LabelPlugin>
                        <Typography fontWeight={600}>
                          {card?.name || '--/--'}
                        </Typography>
                        <S.PluginType $type={card?.type}>
                          {card?.type}
                        </S.PluginType>
                      </S.LabelPlugin>
                      <S.BodyPlugin>
                        <Typography fontWeight={600} color="#555">
                          developer
                        </Typography>
                      </S.BodyPlugin>
                      <S.DesignFul>
                        <Image
                          src={card?.author?.photo}
                          preview={false}
                          width={46}
                          height={46}
                        />
                        <S.Design>
                          <Typography fontWeight={600}>
                            {card?.author?.name}
                          </Typography>
                          <S.ActionDesign>
                            <Typography color="#555">
                              {card?.author?.domain}
                            </Typography>
                          </S.ActionDesign>
                        </S.Design>
                      </S.DesignFul>
                    </S.InfoPlugin>
                  </S.LogoPlugin>
                  <S.ActionPlugin>
                    <S.ActionInstallPlugin>
                      {!card?.isInstalled ? (
                        <S.InstallPlugin
                          onClick={handleInstall}
                          type="primary"
                          isLoading={loadingInstall}
                        >
                          <PlusCircleOutlined />
                          <Typography color="#fff" fontWeight={600}>
                            {t('modal-view-detail-plugin.install')}
                          </Typography>
                        </S.InstallPlugin>
                      ) : (
                        <>
                          <S.UninstallPlugin
                            type="danger"
                            onClick={handleOpenRemoveModal}
                          >
                            Uninstall
                          </S.UninstallPlugin>
                          <S.Configure onClick={handleConfigure}>
                            <SettingFilled />
                            <Typography fontWeight={600}>
                              {t('modal-view-detail-plugin.configure')}
                            </Typography>
                          </S.Configure>
                        </>
                      )}
                    </S.ActionInstallPlugin>

                    <S.ButtonVideo onClick={handleViewVideo}>
                      <Image src={icVideo} preview={false} width={20} />
                    </S.ButtonVideo>
                    <S.ButtonVideo onClick={handleViewDocument}>
                      <Image src={icDocument} preview={false} width={20} />
                    </S.ButtonVideo>
                  </S.ActionPlugin>
                </Col>
              </S.ContentHeader>
            )}

            <S.ModalLineBreak />
          </S.ModalContent>

          <S.ModalDescription>
            {isLoading ? (
              <S.Description>
                <Skeleton active paragraph={{ rows: 20 }} />
              </S.Description>
            ) : (
              <S.Description
                dangerouslySetInnerHTML={{ __html: card?.desc || '' }}
              />
            )}
          </S.ModalDescription>
        </ModalCommon>
      </S.WrapModal>

      {/* Modal xác nhận Uninstall */}
      <Modal
        open={isRemoveModalOpen}
        onCancel={toggleRemoveModal}
        centered
        width={440}
        footer={
          <S.WrappButton>
            <Button onClick={toggleRemoveModal}>
              {t('cancel')}
            </Button>
            <Button
              type="danger"
              isLoading={loadingRemoveBtn}
              onClick={handleUninstall}
            >
             {t('uninstall')}
            </Button>
          </S.WrappButton>
        }
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <ReactSVG src={icNoitify} />
          <div>
            <Typography
              fontWeight={fontWeight?.semiBold}
              margin="0 0 12px 0"
            >
               Uninstall plugin
            </Typography>
            <Typography color="#5B5B5B">
               Confirm uninstalling the plugin?
            </Typography>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalViewDetailPlugin;
