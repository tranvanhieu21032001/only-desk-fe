import { useEffect, useState } from 'react';
import { Col, Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined, SettingFilled } from '@ant-design/icons';

import { CardPluginInterface } from '../../model/allPlugins';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { PluginsStatusEnums } from '../../helper/enums/allPlugins';

import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalViewDetailPlugin.styles';

import icVideo from '@/assets/icons/plugins/ic-video.svg';
import icMockup from '@/assets/icons/plugins/ic-mockup.svg';
import icWebsite from '@/assets/icons/plugins/ic-global.svg';
import icDocument from '@/assets/icons/plugins/ic-document.svg';
import icMessaging from '@/assets/icons/plugins/ic-messaging.svg';

interface ModalViewDetailPluginProps {
  open: boolean;
  onCancel: () => void;
  card: CardPluginInterface;
}

function ModalViewDetailPlugin({
  open,
  onCancel,
  card,
}: ModalViewDetailPluginProps) {
  const { t } = useTranslation('plugins');

  const [isLoading, setIsLoading] = useState<boolean>(true);

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
                    src={card?.icon}
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
                        src={icMockup}
                        preview={false}
                        width={46}
                        height={46}
                      />
                      <S.Design>
                        <Typography fontWeight={fontWeight?.semiBold}>
                          {t('modal-view-detail-plugin.designful')}
                        </Typography>
                        <S.ActionDesign>
                          <Typography color={themeColors?.newtralDark}>
                            {t('modal-view-detail-plugin.designful')}
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
                      disabled={card?.status === PluginsStatusEnums?.INSTALLED}
                    >
                      <PlusCircleOutlined />
                      <Typography
                        color={themeColors?.newtralLightest}
                        fontWeight={fontWeight?.semiBold}
                      >
                        {t('modal-view-detail-plugin.install')}
                      </Typography>
                    </S.InstallPlugin>

                    {card?.status === PluginsStatusEnums?.INSTALLED && (
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
              <Col xs={24} md={6}>
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
              </S.WebsiteWrap>
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
            <S.Description>
              Help Desk Hero - AI-Powered Customer Support Analytics Turn your
              customer conversations into actionable business intelligence with
              Help Desk Hero, the AI-powered analytics tool that transforms your
              Crisp live chat interactions into valuable insights. 🔍 Discover
              What Your Customers Really Think Stop guessing what your customers
              want. Help Desk Hero analyzes your support conversations to
              reveal: Customer sentiment and satisfaction levels Most requested
              features and product improvements Common pain points and
              frustrations Frequently asked questions and best answers Emerging
              bugs and technical issues 💡 Powerful Features Automated
              Conversation Analysis Sync and analyze up to 100 conversations at
              a time Get instant insights about customer sentiment Track trends
              and patterns in customer behavior Identify business opportunities
              and areas for improvement Smart FAQ Generation Automatically
              extract common questions and answers Create comprehensive FAQs
              from real customer interactions Save hours of manual documentation
              work Keep your knowledge base current and relevant Business
              Intelligence Dashboard View top 10 feature requests with
              popularity counts Track customer pain points and their frequency
              Monitor support team performance Analyze market trends and
              opportunities 📊 Data-Driven Decision Making: Make informed
              business decisions based on real customer data: Prioritize feature
              development based on actual demand Address common issues before
              they become problems Improve customer satisfaction with
              data-backed insights Optimize your support resources efficiently
              🚀 Getting Started Install Help Desk Hero from the Crisp
              Marketplace Connect your OpenAI API key Start syncing your
              conversations Watch as insights automatically populate your
              dashboard 📈 Recommended Usage For optimal results: Minimum of 100
              conversations for initial insights 500+ conversations for powerful
              actionable data 1,000+ conversations for business-transforming
              insights 🔒 Security & Privacy Your data security is our priority:
              All data processed on secure North American servers Hosted on
              Canadian soil with Digital Ocean VPS Complete data deletion upon
              app uninstallation Export functionality for preserving valuable
              insights 🎯 Perfect For: E-commerce businesses SaaS companies
              Retail stores Service providers Any business using Crisp chat for
              customer support 🔜 Coming Soon: - Social media content generator
              - AI chatbot with custom training - Homepage optimization advisor
              - Unresolved conversation helper - Feature gap analyzer Transform
              your customer support from a cost center into a strategic asset.
              Let Help Desk Hero unlock the valuable insights hidden in your
              customer conversations today.
            </S.Description>
          )}
        </S.ModalDescription>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalViewDetailPlugin;
