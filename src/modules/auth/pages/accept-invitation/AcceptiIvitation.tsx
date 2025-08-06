import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Image, Spin } from 'antd';
import styled from 'styled-components';

import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import Button from '@/shared/components/common/Button';

import * as S from './AcceptiIvitation.styles';
import bgWorkspace from '@/assets/images/auth/avatarworkpace.png';
import { checkInvitationToken, acceptInvitationToken } from '../../api/auth';
import { AUTH_ROUTES, MAIN_ROUTES } from '@/core/routes/constants';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { useAppDispatch } from '@/shared/hooks';
import { actionLogout } from '../../store/features/auth';

// ✅ Updated: remove absolute full-page overlay
const CenteredOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 16px;
  text-align: center;
`;

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();

  const token = searchParams.get('token');
  const [workspaceInfo, setWorkspaceInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [tokenErrorMessage, setTokenErrorMessage] = useState('');
  const [isWrongUser, setIsWrongUser] = useState(false);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!token) return;

      try {
        const res = await checkInvitationToken(token);
        setWorkspaceInfo(res);
        console.log("res,", res);
        

        if (res?.hasAccount === false) {
          setTimeout(() => {
            navigate(AUTH_ROUTES?.SIGN_UP, { replace: true });
          }, 2000);
          return;
        }

        const accessToken = Cookies.get('_access_token');
        if (!accessToken) {
          setTimeout(() => {
            navigate(AUTH_ROUTES?.SIGN_IN, { replace: true });
          }, 2000);
          return;
        }

        if (
          res?.isCurrentUserInvited === false ||
          !('isCurrentUserInvited' in res)
        ) {
          setIsWrongUser(true);
          setLoading(false);
          return;
        }

        setLoading(false);
      } catch (error: any) {
        console.error('Token check failed:', error);
        const msg = error?.response?.data?.message;

        if (Array.isArray(msg)) {
          setTokenErrorMessage(msg[0]);
        } else if (typeof msg === 'string') {
          setTokenErrorMessage(msg);
        } else {
          setTokenErrorMessage('Invitation token is invalid or expired.');
        }

        setLoading(false);
      }
    };

    fetchTokenInfo();
  }, [token, navigate]);

  const handleAcceptInvitation = async () => {
    if (!token) return;

    setBtnLoading(true);
    try {
      await acceptInvitationToken(token);
      setJoined(true);
    } catch (err: any) {
      console.error('[ACCEPT INVITATION ERROR]:', err);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleGoToInbox = () => {
    navigate(MAIN_ROUTES?.INBOX, { replace: true });
  };

  const handleLogout = () => {
    dispatch(actionLogout());
    navigate(AUTH_ROUTES.SIGN_IN);
  };

  return (
    <S.SignInWrap>
      <S.WrapperBody>
        {loading ? (
          <CenteredOverlay>
            <Spin size="large" />
          </CenteredOverlay>
        ) : tokenErrorMessage ? (
          <Typography color="red" variant="h3" textAlign="center">
            {tokenErrorMessage}
          </Typography>
        ) : (
          <>
            {!joined ? (
              <>
                <S.WrapperUser>
                  <S.Avatar>
                    <Image
                      preview={false}
                      src={workspaceInfo?.workspace?.avatar || bgWorkspace}
                    />
                  </S.Avatar>
                  <S.WrapperDetail>
                    <Typography fontWeight={fontWeight?.semiBold}>
                      {workspaceInfo?.workspace?.name}
                    </Typography>
                    <Typography>
                      <a
                        href={workspaceInfo?.workspace?.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {workspaceInfo?.workspace?.websiteUrl}
                      </a>
                    </Typography>
                  </S.WrapperDetail>
                </S.WrapperUser>

                <Typography
                  variant="h3"
                  color={themeColors?.primary}
                  textAlign="center"
                >
                  You have been invited to join "
                  {workspaceInfo?.workspace?.name}"
                </Typography>

                {isWrongUser ? (
                  <>
                    <Typography textAlign="center">
                      You're currently logged into a different ZestChat account.{' '}
                      <br />
                      To join <b>{workspaceInfo?.workspace?.name}</b>'s
                      workspace, please log out and log in with the correct
                      account linked to the invitation.
                    </Typography>
                    <Button type="primary" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography textAlign="center">
                      ZestChat is a customer service platform used by{' '}
                      {workspaceInfo?.workspace?.name}. Since you already have a
                      ZestChat account, click “Continue” to join{' '}
                      {workspaceInfo?.workspace?.name}'s workspace.
                    </Typography>

                    <Button
                      type="primary"
                      onClick={handleAcceptInvitation}
                      isLoading={btnLoading}
                    >
                      Continue
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Typography
                  variant="h2"
                  color={themeColors?.primary}
                  textAlign="center"
                >
                  We are done!
                </Typography>
                <Typography textAlign="center">
                  You successfully joined {workspaceInfo?.workspace?.name}{' '}
                  inbox. You can now collaborate with your teammates and
                  communicate with customers.
                </Typography>
                <Button
                  type="primary"
                  onClick={handleGoToInbox}
                  isLoading={btnLoading}
                >
                  Go to {workspaceInfo?.workspace?.name} inbox
                </Button>
              </>
            )}
          </>
        )}
      </S.WrapperBody>
    </S.SignInWrap>
  );
};

export default AcceptInvitation;
