import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Typography from '@/shared/components/common/Typography';

import * as S from './PageVisitedRecently.styles';

import icChrome from '@/assets/icons/contact/ic-chrome.svg';
import icGlobal from '@/assets/icons/contact/ic-global.svg';
import icPage from '@/assets/icons/contact/ic-page-visited.svg';
import icEdit from '@/assets/icons/contact/ic-magic-browser.svg';
import icKeyboard from '@/assets/icons/contact/ic-keyboard-open.svg';

interface ContactInformationProps {
  isLoading?: boolean;
}

function PageVisitedRecently({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icGlobal} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.page-visited-recently')}
              </Typography>
            </S.HeaderWrap>
          </S.Header>

          <S.Body>
            <S.TimeOnWebSiteWrap>
              <S.TimeOnWebSite>
                <S.TimeOnWebHeader>
                  <Skeleton.Input
                    active
                    style={{
                      width: '100%',
                      height: 20,
                    }}
                  />
                </S.TimeOnWebHeader>
                <S.TimeOnWebBody>
                  <Skeleton.Avatar
                    active
                    style={{
                      width: 40,
                      height: 20,
                      borderRadius: 0,
                    }}
                  />
                </S.TimeOnWebBody>
              </S.TimeOnWebSite>
              <S.TimeOnWebSite>
                <S.TimeOnWebHeader>
                  <Skeleton.Input
                    active
                    style={{
                      width: '100%',
                      height: 20,
                    }}
                  />
                </S.TimeOnWebHeader>

                <S.DeviceBody>
                  <S.ConversationInfoWrap>
                    <Skeleton.Avatar
                      active
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                    <S.DeviceInformation>
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
                    </S.DeviceInformation>
                  </S.ConversationInfoWrap>
                  <S.HeaderWrap>
                    <Skeleton.Avatar
                      active
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 0,
                      }}
                    />
                    <Skeleton.Input
                      active
                      style={{
                        width: '100%',
                        height: 18,
                      }}
                    />
                  </S.HeaderWrap>
                </S.DeviceBody>
              </S.TimeOnWebSite>
            </S.TimeOnWebSiteWrap>
            {Array(3)
              ?.fill(0)
              ?.map((_, index: number) => (
                <S.ConversationCardWrap key={index}>
                  <S.ConversationInfoWrap>
                    <S.ConversationInfo>
                      <Skeleton.Avatar
                        active
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 0,
                        }}
                      />
                      <Skeleton.Input
                        active
                        style={{
                          width: '100%',
                          height: 18,
                        }}
                      />
                    </S.ConversationInfo>
                  </S.ConversationInfoWrap>
                  <S.ConversationInfoWrap>
                    <S.ConversationInfo>
                      <Skeleton.Input
                        active
                        style={{
                          width: '100%',
                          height: 18,
                        }}
                      />
                      <Skeleton.Avatar
                        active
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 0,
                        }}
                      />
                    </S.ConversationInfo>
                  </S.ConversationInfoWrap>
                </S.ConversationCardWrap>
              ))}
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icGlobal} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.page-visited-recently')}
              </Typography>
            </S.HeaderWrap>
          </S.Header>

          <S.Body>
            <S.TimeOnWebSiteWrap>
              <S.TimeOnWebSite>
                <S.TimeOnWebHeader>
                  <Typography>
                    {t('contact-profile.time-on-website')}
                  </Typography>
                </S.TimeOnWebHeader>
                <S.TimeOnWebBody>
                  <Typography
                    fontWeight={fontWeight?.semiBold}
                    color={themeColors?.secondaryDarker}
                  >
                    2s
                  </Typography>
                </S.TimeOnWebBody>
              </S.TimeOnWebSite>
              <S.TimeOnWebSite>
                <S.TimeOnWebHeader>
                  <Typography>
                    {t('contact-profile.device-information')}
                  </Typography>
                </S.TimeOnWebHeader>

                <S.DeviceBody>
                  <S.ConversationInfoWrap>
                    <Image
                      src={icChrome}
                      alt="browser"
                      width={24}
                      height={24}
                      preview={false}
                    />
                    <S.DeviceInformation>
                      <Typography>Chrome on Win10</Typography>
                      <Typography
                        margin="4px 0 0 0"
                        color={themeColors?.newtralLight}
                      >
                        2001:ee0:4b49:2e80::
                      </Typography>
                    </S.DeviceInformation>
                  </S.ConversationInfoWrap>
                  <S.HeaderWrap>
                    <Image
                      src={icEdit}
                      width={18}
                      height={18}
                      preview={false}
                    />
                    <Typography
                      color={themeColors?.secondaryDarker}
                      fontWeight={fontWeight?.semiBold}
                    >
                      {t('contact-profile.page-visited-recently')}
                    </Typography>
                  </S.HeaderWrap>
                </S.DeviceBody>
              </S.TimeOnWebSite>
            </S.TimeOnWebSiteWrap>
            {Array(3)
              ?.fill(0)
              ?.map((_, index: number) => (
                <S.ConversationCardWrap key={index}>
                  <S.ConversationInfo>
                    <Image
                      src={icPage}
                      alt="page visited"
                      width={20}
                      height={20}
                      preview={false}
                    />
                    <Typography color={themeColors?.primary}>
                      MyBlog - Just another WordPress site
                    </Typography>
                  </S.ConversationInfo>

                  <S.ConversationInfo>
                    <Typography color={themeColors?.newtralLight}>
                      6 hour ago
                    </Typography>
                    <Image
                      src={icKeyboard}
                      alt="page visited"
                      width={20}
                      height={20}
                      preview={false}
                    />
                  </S.ConversationInfo>
                </S.ConversationCardWrap>
              ))}
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default PageVisitedRecently;
