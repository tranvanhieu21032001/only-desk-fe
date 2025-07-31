import { OptionsInterface } from '@/core/model/common';

import IconFlagAmerica from '@/assets/icons/common/ic-flag-america.svg';
import IconFlagVietNam from '@/assets/icons/common/ic-flag-vietnam.svg';
import IconFlagSpanish from '@/assets/icons/common/ic-flag-spanish.svg';
import IconFlagFrance from '@/assets/icons/common/ic-flag-france.svg';
import IconFlagGermany from '@/assets/icons/common/ic-flag-germany.svg';
import IconFlagChina from '@/assets/icons/common/ic-flag-china.svg';
import IconFlagJapan from '@/assets/icons/common/ic-flag-japan.svg';
import IconFlagKorea from '@/assets/icons/common/ic-flag-korea.svg';
import IconFlagPortugal from '@/assets/icons/common/ic-flag-portugal.svg';
import IconFlagItaly from '@/assets/icons/common/ic-flag-italy.svg';

const langOptions: OptionsInterface[] = [
  {
    key: 'en',
    value: 'en',
    label: 'English',
    flag: IconFlagAmerica,
  },
  {
    key: 'vi',
    value: 'vi',
    label: 'Vietnamese',
    flag: IconFlagVietNam,
  },
  {
    key: 'es',
    value: 'es',
    label: 'Spanish',
    flag: IconFlagSpanish,
  },
  {
    key: 'fr',
    value: 'fr',
    label: 'French',
    flag: IconFlagFrance,
  },
  {
    key: 'de',
    value: 'de',
    label: 'German',
    flag: IconFlagGermany,
  },
  {
    key: 'zh',
    value: 'zh',
    label: 'Chinese',
    flag: IconFlagChina,
  },
  {
    key: 'ja',
    value: 'ja',
    label: 'Japanese',
    flag: IconFlagJapan,
  },
  {
    key: 'ko',
    value: 'ko',
    label: 'Korean',
    flag: IconFlagKorea,
  },
  {
    key: 'pt',
    value: 'pt',
    label: 'Kortuguese',
    flag: IconFlagPortugal,
  },
  {
    key: 'it',
    value: 'it',
    label: 'Italian',
    flag: IconFlagItaly,
  },
];

export { langOptions };
