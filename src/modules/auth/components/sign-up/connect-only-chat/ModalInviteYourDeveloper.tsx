import { Form, Image, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';
import { SignUpStepEnums } from '@/modules/auth/helpers/enums/auth';
import { renderStatusInstalled } from '@/modules/auth/helpers/auth.logic';
import { AuthStatusInstalledCodeEnums } from '@/modules/auth/helpers/auth.enums';

import ModalInvite from './modal-invite-your-developer';
import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';

import * as S from './ModalInviteYourDeveloper.styles';

import icCopy from '@/assets/icons/auth/ic-copy.svg';
import icReload from '@/assets/icons/auth/ic-reload.svg';
import icInfo from '@/assets/icons/auth/ic-info-circle.svg';
import icArrowRight from '@/assets/icons/common/ic-arrow-right.svg';
import webLocalStorage from '@/shared/utils/webLocalStorage';

function ConnectOnlyChat() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { visible: inviteModal, toggle: handleOpenModalInvite } = useModal();
  const websiteID = webLocalStorage.get('WEBSITE_ID') || 'YOUR_WEBSITE_ID';

  const scriptSnippet = `<script type="text/javascript">window.$crisp=[];window.ZC_WEBSITE_ID="${websiteID}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`;
  function handleCopyCode() {
    navigator.clipboard
      .writeText(scriptSnippet)
      .then(() => {
        message.success('Copied script to clipboard!');
      })
      .catch(() => {
        message.error('Failed to copy. Please try again.');
      });
  }

  function handleCheckAgain() {
    // TODO: Check logic
  }

  function handleInviteYourDeveloper() {
    handleOpenModalInvite();
  }

  function handleCheckInstall() {
    // TODO: Check install guide
  }

  function handleCopyInviteLink() {
    // TODO: Copy link logic
  }

  function handleContinue() {
    navigate(`/auth/sign-up/${SignUpStepEnums.COMPANY_SIZE}`);
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleContinue}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center">
              {t('connect-onlychat.connect-onlychat-to-your-website')}
            </S.Title>
          </S.LoginLabelWrap>

          <S.ConnectOnlyChatCode>
            <S.ConnectOnlyChatCodeHeader>
              <S.Title variant="h4">
                {t('connect-onlychat.connect-onlychat-manually')}
              </S.Title>
              <Typography color={themeColors?.newtralLight} margin="4px 0 0 0">
                {t('connect-onlychat.paste-the-code')}
                <Image src={icInfo} preview={false} />
              </Typography>
            </S.ConnectOnlyChatCodeHeader>

            <S.ConnectOnlyChatCodeBody>
              <S.ConnectOnlyChatCodeBody>
                <pre
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                >
                  {scriptSnippet}
                </pre>
              </S.ConnectOnlyChatCodeBody>
            </S.ConnectOnlyChatCodeBody>

            <S.ConnectOnlyChatCodeBottom>
              <Button type="primary" onClick={handleCopyCode}>
                <Image src={icCopy} preview={false} />
                {t('connect-onlychat.copy-code')}
              </Button>
              <S.StatusConnect>
                {renderStatusInstalled(
                  AuthStatusInstalledCodeEnums.NOT_INSTALLED,
                  t,
                )}
                <Button disabled={true} onClick={handleCheckAgain}>
                  <Image src={icReload} preview={false} />
                  {t('connect-onlychat.check-again')}
                </Button>
              </S.StatusConnect>
            </S.ConnectOnlyChatCodeBottom>
          </S.ConnectOnlyChatCode>

          <S.ConnectOnlyChatCodeInvite>
            <Button type="primary" onClick={handleInviteYourDeveloper}>
              {t('connect-onlychat.invite-your-developer')}
            </Button>
            <S.ButtonInstallGuide>
              <Button onClick={handleCheckInstall}>
                {t('connect-onlychat.check-install-guide')}
              </Button>
            </S.ButtonInstallGuide>
          </S.ConnectOnlyChatCodeInvite>

          <S.LoginButton type="primary" onClick={() => form.submit()}>
            {t('website.continue')}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>

      {inviteModal && (
        <ModalInvite
          open={inviteModal}
          onCancel={handleOpenModalInvite}
          onCopyInviteLink={handleCopyInviteLink}
        />
      )}
    </S.SignInWrap>
  );
}

export default ConnectOnlyChat;
