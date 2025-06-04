import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import * as S from './StepConfigure.styles';
import { useTranslation } from 'react-i18next';
import { Image, Input } from 'antd';

import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';

const StepConfigure = () => {
  const { t } = useTranslation('knowledgeBase');

  return (
    <>
      <Typography fontWeight={fontWeight.semiBold}>
        {t('article-menu.import-articles.configure-import')}
      </Typography>

      <S.ModalDescription>
        <Typography color={themeColors?.newtralLight}>
          {t('article-menu.import-articles.onlychat-with-automatically')}
        </Typography>
      </S.ModalDescription>

      <S.FormField>
        <Typography fontWeight={fontWeight.medium}>
          <S.FormInput>
            {t('article-menu.import-articles.previous-knowledge-base-url')}
            <Image src={icValid} height={23} width={7} />
          </S.FormInput>
        </Typography>
        <Input
          placeholder={t('article-menu.import-articles.enter-knowledge-base-url')}
          size="large"
        />
      </S.FormField>
    </>
  );
};

export default StepConfigure;
