import { Image as AntImage, Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import { useAppSelector } from '@/shared/hooks';
import * as S from './LastReportedLocation.styles';
import icLocation from '@/assets/icons/contact/ic-location.svg';
import flagList from '@/shared/helper/data/flagIcon';
import empty from '@/assets/images/contact/img-contact-empty.png';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

interface ContactInformationProps {
  isLoading?: boolean;
}

const getTimeInTimezone = (tz: string) => {
  if (!tz) return '-';
  const currentTime = dayjs().tz(tz);
  const offset = currentTime.format('Z'); // +07:00
  return `${currentTime.format('hh:mm:ss A')} (UTC${offset})`;
};

function LastReportedLocation({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');
  const { contactDetails } = useAppSelector((state) => state.contacts);
  const context = contactDetails?.context;

  const city = context?.city;
  const country = context?.country;
  const timezone = context?.timezone;
  const language = context?.language;
  const device = context?.os;
  const browser = context?.browser;

  const countryCodeFromLang = language?.split('-')?.[1]?.toUpperCase();
  const flagIcon = flagList.find(
    (item) => item.code === countryCodeFromLang,
  )?.image;

  return (
    <S.Container>
      <S.Header>
        <AntImage src={icLocation} width={24} height={24} preview={false} />
        <Typography variant="h5" color={themeColors?.secondaryDarker}>
          {t('contact-profile.last-reported-location')}
        </Typography>
      </S.Header>

      <S.Body>
        {!context || Object.keys(context).length === 0 ? (
          <S.EmptyWrap>
            <Image src={empty} width={120} height={120} preview={false} />
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.no-data-added')}
            </Typography>
          </S.EmptyWrap>
        ) : (
          <>
            {' '}
            {/* City + Country */}
            {(city || country) && (
              <S.ContentWrap>
                <Typography>
                  {city && country
                    ? `${t('contact-profile.city')}, ${t('contact-profile.country')}`
                    : city
                      ? t('contact-profile.city')
                      : t('contact-profile.country')}
                </Typography>
                {flagIcon && (
                  <S.Flag2
                    preview={false}
                    src={flagIcon}
                    alt="flag"
                    width={36}
                    height={23}
                  />
                )}

                {isLoading ? (
                  <Skeleton.Input
                    active
                    style={{ height: 23, width: '100%' }}
                  />
                ) : (
                  <Typography>
                    {[city, country].filter(Boolean).join(', ')}
                  </Typography>
                )}
              </S.ContentWrap>
            )}
            {device && (
              <S.ContentWrap>
                <Typography>{t('contact-profile.device')}</Typography>
                {isLoading ? (
                  <Skeleton.Input
                    active
                    style={{ height: 23, width: '100%' }}
                  />
                ) : (
                  <Typography>
                    {browser} on {device}
                  </Typography>
                )}
              </S.ContentWrap>
            )}
            {/* Timezone (Local Time) */}
            {timezone && (
              <S.ContentWrap>
                <Typography>{t('contact-profile.local-time')}</Typography>
                {isLoading ? (
                  <Skeleton.Input
                    active
                    style={{ height: 23, width: '100%' }}
                  />
                ) : (
                  <Typography>{getTimeInTimezone(timezone)}</Typography>
                )}
              </S.ContentWrap>
            )}
            {/* Language + Flag */}
            {language && (
              <S.ContentWrap>
                <Typography>{t('contact-profile.languages')}</Typography>
                {isLoading ? (
                  <Skeleton.Input
                    active
                    style={{ height: 23, width: '100%' }}
                  />
                ) : (
                  <>
                    {flagIcon && (
                      <AntImage
                        src={flagIcon}
                        alt="flag"
                        preview={false}
                        width={36}
                        height={23}
                      />
                    )}
                  </>
                )}
              </S.ContentWrap>
            )}
          </>
        )}
      </S.Body>
    </S.Container>
  );
}

export default LastReportedLocation;
