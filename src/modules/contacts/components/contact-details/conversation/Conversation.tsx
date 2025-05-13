import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '@/shared/components/common/Typography';

import * as S from './Conversation.styles';

import icAvatarMockup from '@/assets/icons/layout/ic-avatar-mock.svg';
import icConversation from '@/assets/icons/contact/ic-send-message.svg';

interface ContactInformationProps {
  isLoading?: boolean;
}

function Conversation({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image
                src={icConversation}
                width={24}
                height={24}
                preview={false}
              />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.conversation')}
              </Typography>
            </S.HeaderWrap>
            <S.HeaderActionWrap>
              <PlusOutlined />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.new-conversation')}
              </Typography>
            </S.HeaderActionWrap>
          </S.Header>

          <S.Body>
            {Array(3)
              ?.fill(0)
              ?.map((_, index: number) => (
                <S.ConversationCardWrap key={index}>
                  <S.ConversationInfoWrap>
                    <Skeleton.Avatar
                      active
                      style={{
                        width: '40px',
                        height: '40px',
                      }}
                    />

                    <S.ConversationInfo>
                      <Skeleton.Input
                        active
                        style={{
                          width: '100%',
                          height: 18,
                        }}
                      />
                      <Skeleton.Input
                        active
                        style={{
                          width: '100%',
                          height: 18,
                          marginTop: 4,
                        }}
                      />
                    </S.ConversationInfo>
                  </S.ConversationInfoWrap>
                  <Skeleton.Input
                    active
                    style={{
                      width: 50,
                      height: 18,
                      maxWidth: 50,
                    }}
                  />
                </S.ConversationCardWrap>
              ))}
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image
                src={icConversation}
                width={24}
                height={24}
                preview={false}
              />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.conversation')}
              </Typography>
              <S.ConversationCount>
                <Typography
                  variant="caption-small"
                  color={themeColors?.secondary}
                >
                  1
                </Typography>
              </S.ConversationCount>
            </S.HeaderWrap>
            <S.HeaderActionWrap>
              <PlusOutlined />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.new-conversation')}
              </Typography>
            </S.HeaderActionWrap>
          </S.Header>

          <S.Body>
            {Array(3)
              ?.fill(0)
              ?.map((_, index: number) => (
                <S.ConversationCardWrap key={index}>
                  <S.ConversationInfoWrap>
                    <Image
                      src={icAvatarMockup}
                      alt="Avatar"
                      width={40}
                      height={40}
                      preview={false}
                    />
                    <S.ConversationInfo>
                      <Typography color={themeColors?.secondaryDark}>
                        Admin 3
                      </Typography>
                      <Typography
                        margin="4px 0 0 0"
                        color={themeColors?.newtralLight}
                      >
                        John Smith submitted web form
                      </Typography>
                    </S.ConversationInfo>
                  </S.ConversationInfoWrap>
                  <Typography color={themeColors?.newtralLight}>10m</Typography>
                </S.ConversationCardWrap>
              ))}
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default Conversation;
