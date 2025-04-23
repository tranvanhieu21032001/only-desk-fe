import { isEmpty } from "lodash";
import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";

import { useModal } from "@/shared/hooks";
import { constants } from "@/core/settings";
import { useRouter } from "@/shared/hooks/useRouter";
import { SignUpStepEnums } from "../../helpers/enums/auth";
import { connectPlugins } from "../../helpers/data/signUp";
import webLocalStorage from "@/shared/utils/webLocalStorage";
import themeColors from "@/shared/styles/themes/default/colors";
import { renderStatusInstalled } from "../../helpers/auth.logic";
import { AuthStatusInstalledCodeEnums } from "../../helpers/auth.enums";

import Button from "@/shared/components/common/Button";
import ModalInvite from "./ModalInviteYourDeveloper";
import Typography from "@/shared/components/common/Typography";

import icCopy from "@/assets/icons/auth/ic-copy.svg";
import icReload from "@/assets/icons/auth/ic-reload.svg";
import icInfo from "@/assets/icons/auth/ic-info-circle.svg";
import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";

import * as S from "./connect-chat.styles";

function ConnectOnlyChat() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();
  const { replaceState } = useRouter();
  const { visible: inviteModal, toggle: handleOpenModalInvite } = useModal();

  const signUpFromLocal =  webLocalStorage.get(constants?.SIGN_UP_INFO)

  function handleInviteYourTeam() {
    replaceState({
      type: SignUpStepEnums?.COMPANY_SIZE,
    });
  }

  function handleCopyCode() {
    //TODO handle later
  }

  function handleCheckAgain() {
    //TODO handle later
  }

  function handleInviteYourDeveloper() {
    handleOpenModalInvite();
  }

  function handleCheckInstall() {
    //TODO handle later
  }

  function handleConnectPlugin() {
    //TODO handle later
  }

  function handleCheckInstallPlugin() {
    //TODO handle later
  }

  function handleCopyInviteLink() {
    //TODO handle later
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleInviteYourTeam}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center">
              {t("connect-onlychat.connect-onlychat-to-your-website")}
            </S.Title>
          </S.LoginLabelWrap>

          <S.ConnectOnlyChatCode>
            <S.ConnectOnlyChatCodeHeader>
              <S.Title variant="h4">
                {t("connect-onlychat.connect-onlychat-manually")}
              </S.Title>
              <Typography color={themeColors?.newtralLight} margin="4px 0 0 0">
                {t("connect-onlychat.paste-the-code")}{" "}
                <Image src={icInfo} preview={false} />
              </Typography>
            </S.ConnectOnlyChatCodeHeader>

            <S.ConnectOnlyChatCodeBody>
              {`<!-- Start of LiveChat (www.livechat.com) code -->
      <script>
        window.__lc = window.__lc || {};
        window.__lc.license = 19123994;
        window.__lc.integration_name = "manual_onboarding";
        window.__lc.product_name = "livechat";
        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
      </script>
      <noscript><a href="https://www.livechat.com/chat-with/19123994/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a></noscript>
      <!-- End of LiveChat code -->`}
            </S.ConnectOnlyChatCodeBody>

            <S.ConnectOnlyChatCodeBottom>
              <Button type="primary" onClick={handleCopyCode}>
                <Image src={icCopy} preview={false} />
                {t("connect-onlychat.copy-code")}
              </Button>
              <S.StatusConnect>
                {renderStatusInstalled(
                  AuthStatusInstalledCodeEnums.NOT_INSTALLED,
                  t
                )}
                <Button disabled={true} onClick={handleCheckAgain}>
                  <Image src={icReload} preview={false} />
                  {t("connect-onlychat.check-again")}
                </Button>
              </S.StatusConnect>
            </S.ConnectOnlyChatCodeBottom>
          </S.ConnectOnlyChatCode>

          <S.ConnectOnlyChatCodeInvite>
            <Button type="primary" onClick={handleInviteYourDeveloper}>
              {t("connect-onlychat.invite-your-developer")}
            </Button>
            <S.ButtonInstallGuide>
              <Button onClick={handleCheckInstall}>
                {t("connect-onlychat.check-install-guide")}
              </Button>
            </S.ButtonInstallGuide>
          </S.ConnectOnlyChatCodeInvite>

          <S.ConnectPluginWrap gutter={[8, 24]}>
            {connectPlugins?.map((item) => (
              <S.ConnectPlugin key={item?.key} xs={24} sm={12} md={8}>
                <S.ConnectPluginCollapse
                  title={
                    <S.ConnectPluginTitle>
                      <Image src={item?.icon} preview={false} />
                      <Typography>{item?.label}</Typography>
                    </S.ConnectPluginTitle>
                  }
                  defaultOpen={false}
                >
                  <S.ConnectPluginAction>
                    <S.BtnConnect>
                      <Button type="primary" onClick={handleConnectPlugin}>
                        {t("connect-onlychat.connect")}
                      </Button>
                    </S.BtnConnect>
                    <S.BtnCheck>
                      <Button onClick={handleCheckInstallPlugin}>
                        {t("connect-onlychat.check-install-guide")}
                      </Button>
                    </S.BtnCheck>
                  </S.ConnectPluginAction>
                </S.ConnectPluginCollapse>
              </S.ConnectPlugin>
            ))}
          </S.ConnectPluginWrap>

          <S.LoginButton type="primary" onClick={() => form.submit()} disabled={isEmpty(signUpFromLocal?.invitedDevelopers || [])}>
            {t("website.continue")}
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
