import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import * as S from './StepConfigure.styles';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';

const StepConfigure = () => {
  const { t } = useTranslation('knowledgeBase');

  return (
    <>
      <Typography fontWeight={fontWeight.semiBold}>
        {t('article-menu.getting-started-knowledge.step-title')}
      </Typography>

      <S.ModalDescription>
        <Typography color={themeColors?.newtralLight}>
          {t('article-menu.getting-started-knowledge.step-description')}
        </Typography>
      </S.ModalDescription>

      <S.FormField>
        <Typography fontWeight={fontWeight.medium}>
          {t('article-menu.getting-started-knowledge.name-label')}
        </Typography>
        <Input
          placeholder={t('article-menu.getting-started-knowledge.name-placeholder')}
          size="large"
        />
      </S.FormField>

      <S.FormField>
        <Typography fontWeight={fontWeight.medium}>
          {t('article-menu.getting-started-knowledge.subdomain-label')}
        </Typography>

        <div style={{ position: 'relative' }}>
          <Input
            placeholder={t('article-menu.getting-started-knowledge.subdomain-placeholder')}
            size="large"
          />

          <S.HelpButton>
             {t('article-menu.getting-started-knowledge.subdomain-suffix')}
          </S.HelpButton>
        </div>
      </S.FormField>
    </>
  );
};

export default StepConfigure;
