import React, { useState } from 'react';
import { Image, Row } from 'antd';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Modal from '@/shared/components/common/Modal';
import Input from '@/shared/components/common/Input';
import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import { ToastMessageType } from '@/shared/helper/enums/common';
import ToastMessage from '@/shared/components/common/ToastMessage';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import { crispScript } from '@/modules/settings/constants/workspace.constant';
import { workspaceIntegrations } from '@/modules/settings/helpers/data/workspace';

import * as S from './WorkspaceSetupIntegrations.styles';

import icCopy from '@/assets/icons/workspace/ic-copy.svg';
import icSeeAllIntegrations from '@/assets/icons/workspace/ic-see-all-integrations.svg';
import icCopyCode from '@/assets/icons/setting/ic-copy-code.svg';

function WorkspaceSetupIntegrations() {
  const { t } = useTranslation('settingWorkspace');
  const [isModalSetupChatbox, setIsModalSetupChatbox] = useState(false);
  const [techEmail, setTechEmail] = useState('');
  const [sending, setSending] = useState(false);

  function handleCopyId() {
    navigator.clipboard.writeText('f50a260a-6085-4e86-9bf8-359fc7b8de34');

    toast(
      React.createElement(ToastMessage, {
        typeToast: ToastMessageType?.SUCCESS,
        message: t('setup-integrations.copy-success'),
      }),
    );
  }

  function handleCopyScript() {
    navigator.clipboard.writeText(crispScript);

    toast(
      React.createElement(ToastMessage, {
        typeToast: ToastMessageType?.SUCCESS,
        message: t('setup-integrations.copy-script-success'),
      }),
    );
  }

  function handleSeeAllIntegrations() {
    // TODO handle later
  }

  function handleSendInstructions() {
    if (!techEmail) {
      toast(
        React.createElement(ToastMessage, {
          typeToast: ToastMessageType?.ERROR,
          message: 'Please enter your tech team mail',
        }),
      );
      return;
    }
    setSending(true);
    // TODO: Send email here (call API or logic send email)
    setTimeout(() => {
      setSending(false);
      toast(
        React.createElement(ToastMessage, {
          typeToast: ToastMessageType?.SUCCESS,
          message: 'Instructions sent successfully!',
        }),
      );
      setTechEmail('');
    }, 1000);
  }

  return (
    <S.AccountInformationContainer>
      <S.AccountInformation>
        <S.AccountInformationLabel>
          <Typography
            fontWeight={fontWeight?.semiBold}
            color={themeColors?.secondaryDarker}
          >
            {t('setup-integrations.setup-integrations')}
          </Typography>
        </S.AccountInformationLabel>

        <S.InformationBlock>
          <S.BodyBlock>
            <Row gutter={[8, 8]}>
              <S.Column xs={24} sm={7} md={4}>
                <Typography>{t('setup-integrations.website-id')}</Typography>
              </S.Column>
              <S.ColumnAvatar xs={24} sm={17} md={20}>
                <Input
                  isHeight="47px"
                  disabled
                  placeholder="f50a260a-6085-4e86-9bf8-359fc7b8de34"
                />
                <Button
                  type="primary"
                  onClick={handleCopyId}
                  icon={
                    <Image
                      src={icCopy}
                      width={18}
                      height={18}
                      preview={false}
                    />
                  }
                >
                  {t('setup-integrations.copy')}
                </Button>
              </S.ColumnAvatar>

              <S.Column xs={24} sm={7} md={4}>
                <Typography>{t('setup-integrations.chatbox')}</Typography>
              </S.Column>

              <S.ColumnAvatar xs={24} sm={17} md={20}>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsModalSetupChatbox(true);
                  }}
                >
                  {t('setup-integrations.chatbox-setup-instructions')}
                </Button>
              </S.ColumnAvatar>
            </Row>
          </S.BodyBlock>
        </S.InformationBlock>

        {workspaceIntegrations?.map((integrations) => (
          <S.InformationBlock key={integrations?.key}>
            <S.HeaderBlock>
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {integrations?.label}
              </Typography>
            </S.HeaderBlock>

            <S.CardIntegrationWrap>
              {!isEmpty(integrations?.children) &&
                integrations?.children?.map((integration) => (
                  <S.CardIntegration key={integration?.key}>
                    <Image
                      src={integration?.logo}
                      width={60}
                      height={60}
                      preview={false}
                    />
                    <Typography>{integration?.label}</Typography>
                  </S.CardIntegration>
                ))}
            </S.CardIntegrationWrap>
          </S.InformationBlock>
        ))}
      </S.AccountInformation>

      <Modal
        width={700}
        isOpen={isModalSetupChatbox}
        onClose={() => {
          setIsModalSetupChatbox(false);
        }}
        title="Integrate OnlyChat With Your Website"
        description="Please insert modal description here."
        footer={
          <>
            <Button
              type="default"
              width="100px"
              onClick={() => {
                setIsModalSetupChatbox(false);
              }}
            >
              Cancel
            </Button>
          </>
        }
      >
        <S.ChatBoxModal>
          <S.CopyBox>
            <p>1. Copy the following code</p>

            <S.CopyCodeBox>
              <pre
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  lineHeight: 1.5,
                }}
              >
                {crispScript}
              </pre>
              <img src={icCopyCode} alt="" onClick={handleCopyScript} />
            </S.CopyCodeBox>
          </S.CopyBox>

          <S.CopyBox>
            <p>2. Add the code in your page</p>

            <S.TextBoxModal>
              <span>
                Paste the OnlyChat chatbox code above in your page. You can add
                it in the HTML head section. <br />
                If the chatbox is not showing, try to reset your cache. You can
                also contact our support team.
              </span>
            </S.TextBoxModal>
          </S.CopyBox>

          <S.CopyBox>
            <p>3. Extra</p>

            <S.TextBoxModal>
              <span>
                Get more of your chatbox by pushing your existing users email,
                and many more.
              </span>
            </S.TextBoxModal>
          </S.CopyBox>

          <S.SendEmailBox>
            <S.TextBoxLabel>
              Forward to my tech team <span>*</span>
            </S.TextBoxLabel>
            <S.TextBoxFlex>
              <input
                style={{ flex: 1 }}
                placeholder="Enter your tech team mail"
                value={techEmail}
                onChange={(e) => setTechEmail(e.target.value)}
              />
              <Button
                width="200px"
                type="primary"
                onClick={handleSendInstructions}
                isLoading={sending}
              >
                Send Instructions
              </Button>
            </S.TextBoxFlex>
          </S.SendEmailBox>
        </S.ChatBoxModal>
      </Modal>

      <S.LookingAccountInformation>
        <Button type="primary" onClick={handleSeeAllIntegrations}>
          <Image
            src={icSeeAllIntegrations}
            preview={false}
            width={18}
            height={18}
          />
          {t('setup-integrations.see-all-integrations')}
        </Button>
      </S.LookingAccountInformation>
    </S.AccountInformationContainer>
  );
}

export default WorkspaceSetupIntegrations;
