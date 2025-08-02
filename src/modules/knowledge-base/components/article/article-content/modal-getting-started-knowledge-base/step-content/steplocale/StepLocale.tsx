import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import * as S from './StepLocale.styles';
import { langOptions } from '@/modules/auth/helpers/data/signIn';
import { OptionsInterface } from '@/core/model/common';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';

import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';

const StepLocale = () => {
  const { t } = useTranslation('knowledgeBase');

  return (
    <>
      <Typography fontWeight={fontWeight.semiBold}>
        {t('article-menu.getting-started-knowledge.locale-title')}
      </Typography>

      <S.ModalDescription>
        <Typography color={themeColors.newtralLight}>
          {t('article-menu.getting-started-knowledge.locate-description')}
        </Typography>
      </S.ModalDescription>
      <S.FormField>
        <Typography fontWeight={fontWeight.medium}>
          <S.FormInput>
            {t('article-menu.add-a-language.language')}
            <Image src={icValid} height={23} width={7} />
          </S.FormInput>
        </Typography>

        <S.ChangeLang
          defaultValue={langOptions?.[0]?.value}
          popupClassName="auth-lang"
        >
          {langOptions?.map((lang: OptionsInterface) => (
            <S.LangOption key={lang?.key}>
              <Image src={lang?.flag as string} preview={false} />
              <Typography>
                {t(`article-menu.language.${lang?.label.toLowerCase()}`)}
              </Typography>
            </S.LangOption>
          ))}
        </S.ChangeLang>

      </S.FormField>
    </>
  );
};

export default StepLocale;
