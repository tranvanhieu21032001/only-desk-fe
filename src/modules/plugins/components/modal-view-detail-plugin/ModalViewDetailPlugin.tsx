import { useEffect, useState } from 'react';
import { Col, Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined, SettingFilled } from '@ant-design/icons';

import { CardPluginInterface } from '../../model/allPlugins';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { PluginsStatusEnums } from '../../helpers/enums/allPlugins';

import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalViewDetailPlugin.styles';

import icVideo from '@/assets/icons/plugins/ic-video.svg';
import icMockup from '@/assets/icons/plugins/ic-mockup.svg';
import icDocument from '@/assets/icons/plugins/ic-document.svg';
import { getPluginDetail } from '../../api/plugin.api';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [card, setCard] = useState<any | null>(null);
  useEffect(() => {
    if (open && cardId) {
      setIsLoading(true);

      getPluginDetail(cardId)
        .then((data) => {
          if (data?.__typename === 'Plugin') {
            setCard(data);
            console.log('✅ Plugin Detail:', data);
          } else {
            console.warn('❌ Not a Plugin node');
          }
        })
        .catch((error) => {
          console.error('❌ Failed to fetch plugin detail:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, cardId]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  function handleViewVideo() {
    //TODO handle later
  }

  function handleViewDocument() {
    //TODO handle later
  }

  function handleInstall() {
    //TODO handle later
  }

  function handleConfigure() {
    //TODO handle later
  }

  return (
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
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-view-detail-plugin.plugins')}
            </Typography>
            <Typography color={themeColors?.newtralLight}>
              {t('modal-view-detail-plugin.please-insert-modal-description')}
            </Typography>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalContent>
          {isLoading ? (
            <S.ContentHeader gutter={[72, 16]}>
              <Col xs={24} md={12}>
                <S.LogoPlugin>
                  <Skeleton.Image active style={{ width: 130, height: 130 }} />
                  <S.InfoPlugin>
                    <S.LabelPlugin>
                      <Skeleton.Input
                        active
                        style={{ width: 100, height: 22 }}
                      />
                      <Skeleton.Input
                        active
                        style={{ minWidth: 50, width: 50, height: 22 }}
                      />
                    </S.LabelPlugin>
                    <S.BodyPlugin>
                      <Skeleton.Input
                        active
                        style={{ width: 100, height: 22 }}
                      />
                    </S.BodyPlugin>
                    <S.DesignFul>
                      <Skeleton.Image
                        active
                        style={{ width: 46, height: 46 }}
                      />
                      <S.Design>
                        <Skeleton.Input
                          active
                          style={{ width: 100, height: 22 }}
                        />
                        <S.ActionDesign>
                          <Skeleton.Input
                            active
                            style={{ minWidth: 50, width: 50, height: 22 }}
                          />
                        </S.ActionDesign>
                      </S.Design>
                    </S.DesignFul>
                  </S.InfoPlugin>
                </S.LogoPlugin>
                <S.ActionPlugin>
                  <Skeleton.Input active style={{ width: 120, height: 38 }} />
                  <Skeleton.Input active style={{ width: 120, height: 38 }} />
                  <Skeleton.Input
                    active
                    style={{ minWidth: 50, width: 50, height: 38 }}
                  />
                  <Skeleton.Input
                    active
                    style={{ minWidth: 50, width: 50, height: 38 }}
                  />
                </S.ActionPlugin>
              </Col>
              <Col xs={24} md={6}>
                <Skeleton active />
              </Col>
              <Col xs={24} md={6}>
                <Skeleton active />
              </Col>
            </S.ContentHeader>
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
                      <Typography fontWeight={fontWeight?.semiBold}>
                        {card?.name || '--/--'}
                      </Typography>
                      <S.PluginType $type={card?.type}>
                        {card?.type}
                      </S.PluginType>
                    </S.LabelPlugin>
                    <S.BodyPlugin>
                      <Typography
                        fontWeight={fontWeight?.semiBold}
                        color={themeColors?.newtralDark}
                      >
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
                        <Typography fontWeight={fontWeight?.semiBold}>
                          {card?.author?.name}
                        </Typography>
                        <S.ActionDesign>
                          <Typography color={themeColors?.newtralDark}>
                            {card?.author?.domain}
                          </Typography>
                        </S.ActionDesign>
                      </S.Design>
                    </S.DesignFul>
                  </S.InfoPlugin>
                </S.LogoPlugin>
                <S.ActionPlugin>
                  <S.ActionInstallPlugin>
                    <S.InstallPlugin
                      onClick={handleInstall}
                      type="primary"
                      disabled={card?.isInstalled === true}
                    >
                      <PlusCircleOutlined />
                      <Typography
                        color={themeColors?.newtralLightest}
                        fontWeight={fontWeight?.semiBold}
                      >
                        {t('modal-view-detail-plugin.install')}
                      </Typography>
                    </S.InstallPlugin>

                    {card?.isInstalled && (
                      <S.Configure onClick={handleConfigure}>
                        <SettingFilled />
                        <Typography fontWeight={fontWeight?.semiBold}>
                          {t('modal-view-detail-plugin.configure')}
                        </Typography>
                      </S.Configure>
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
              {/* <Col xs={24} md={6}>
                <S.Messaging>
                  <Image src={icMessaging} preview={false} />
                  <Typography fontWeight={fontWeight?.semiBold}>
                    {t('modal-view-detail-plugin.messaging')}
                  </Typography>
                </S.Messaging>
                <Typography margin="8px 0 0 0" color={themeColors?.newtralDark}>
                  Read sessions
                </Typography>
                <Typography margin="8px 0 0 0" color={themeColors?.newtralDark}>
                  Read & write messages
                </Typography>
                <Typography margin="8px 0 0 0" color={themeColors?.newtralDark}>
                  Read states
                </Typography>
                <Typography margin="8px 0 0 0" color={themeColors?.newtralDark}>
                  Reat participants
                </Typography>
                <Typography margin="8px 0 0 0" color={themeColors?.newtralDark}>
                  Read events
                </Typography>
              </Col>
              <S.WebsiteWrap xs={24} md={6}>
                <S.Website>
                  <S.Messaging>
                    <Image src={icWebsite} preview={false} />
                    <Typography fontWeight={fontWeight?.semiBold}>
                      {t('modal-view-detail-plugin.website')}
                    </Typography>
                  </S.Messaging>
                  <Typography
                    margin="8px 0 0 0"
                    color={themeColors?.newtralDark}
                  >
                    Read operators
                  </Typography>
                </S.Website>

                <S.Website>
                  <S.Messaging>
                    <Image src={icWebsite} preview={false} />
                    <Typography fontWeight={fontWeight?.semiBold}>
                      {t('modal-view-detail-plugin.permissions')}
                    </Typography>
                  </S.Messaging>
                  <S.Permissions>
                    <Typography>
                      {t('modal-view-detail-plugin.what-are-permissions')}
                    </Typography>
                  </S.Permissions>
                </S.Website>
              </S.WebsiteWrap> */}
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
            <S.Description dangerouslySetInnerHTML={{ __html: card?.desc || '' }} />
          )}
        </S.ModalDescription>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalViewDetailPlugin;
