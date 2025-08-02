import { Image as AntImage, Skeleton } from 'antd';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import flagList from '@/shared/helper/data/flagIcon';
import empty from '@/assets/images/contact/img-contact-empty.png';

import icLocation from '@/assets/icons/contact/ic-location2.svg';
import icTime from '@/assets/icons/contact/ic-clock.svg';
import icGlobal from '@/assets/icons/contact/ic-global2.svg';
import icMinitor from '@/assets/icons/contact/ic-minitor.svg';

import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

import * as S from './LastReportedLocation.styles';

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

interface ContextType {
  city?: string;
  countryName?: string;
  timezone?: string;
  language?: string;
  os?: string;
  browser?: string;
  countryCode?: string;
}

interface LastReportedLocationBodyProps {
  context?: ContextType;
  isLoading?: boolean;
}

const getTimeInTimezone = (tz: string) => {
  if (!tz) return '-';
  const offsetMatch = tz.match(/^UTC([+-]\d{1,2})$/);
  if (offsetMatch) {
    const offset = parseInt(offsetMatch[1], 10);
    const currentTime = dayjs().utcOffset(offset);
    return `${currentTime.format('hh:mm:ss A')} (UTC${offsetMatch[1]})`;
  }
  try {
    const currentTime = dayjs().tz(tz);
    const offset = currentTime.format('Z');
    return `${currentTime.format('hh:mm:ss A')} (UTC${offset})`;
  } catch {
    return '-';
  }
};


function LastReportedLocationBody({
  context,
  isLoading,
}: LastReportedLocationBodyProps) {
  const { t } = useTranslation('contacts');
  if (context === undefined) {
    return (
      <S.ContentWrap>
        <Skeleton active />
      </S.ContentWrap>
    );
  }

  if (!context?.countryCode && !context?.countryName) {
    return (
      <S.EmptyWrap>
        <AntImage src={empty} width={120} height={120} preview={false} />
        <Typography color={themeColors?.primary} margin="8px 0 0 0">
          {t('contact-profile.no-data-added')}
        </Typography>
      </S.EmptyWrap>
    );
  }

  const { city, countryName: country, timezone, language, os: device, browser, countryCode } = context;

  const flagIcon = flagList.find((item) => item.code === countryCode)?.image;

  const fieldMap = [
    {
      key: 'location',
      label: `${t('contact-profile.country')}`,
      value: [city, country].filter(Boolean).join(', '),
      icon: icLocation,
      show: city || country,
      customRender: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {flagIcon && (
            <AntImage
              src={flagIcon}
              alt="flag"
              preview={false}
              width={36}
              height={23}
            />
          )}
          <Typography>
            {[city, country].filter(Boolean).join(', ')}
          </Typography>
        </div>
      ),
    },
    {
      key: 'device',
      label: t('contact-profile.device'),
      value: browser && device ? `${browser} on ${device}` : '',
      icon: icMinitor,
      show: device,
    },
    {
      key: 'timezone',
      label: t('contact-profile.local-time'),
      value: timezone ? getTimeInTimezone(timezone) : '',
      icon: icTime,
      show: timezone,
    },
    {
      key: 'language',
      label: t('contact-profile.languages'),
      value: '',
      icon: icGlobal,
      show: language,
      customRender: flagIcon && (
        <div>
          <AntImage
            src={flagIcon}
            alt="flag"
            preview={false}
            width={36}
            height={23}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {fieldMap.map(({ key, label, value, icon, show, customRender }) =>
        show ? (
          <S.ContentWrap key={key}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {icon && (
                <AntImage src={icon} preview={false} width={20} height={20} />
              )}
              <Typography>{label}</Typography>
            </div>

            {isLoading ? (
              <Skeleton.Input active style={{ height: 23, width: '100%' }} />
            ) : customRender ? (
              <div>{customRender}</div>
            ) : (
              <Typography>{value || '-'}</Typography>
            )}
          </S.ContentWrap>
        ) : null
      )}
    </>
  );
}

export default LastReportedLocationBody;
