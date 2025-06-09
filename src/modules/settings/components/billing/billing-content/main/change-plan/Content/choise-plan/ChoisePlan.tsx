import { Image, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import * as S from './ChoisePlan.styles';
import Button from '@/shared/components/common/Button';

import icCheck from '@/assets/icons/billing/ic-tick-circle2.svg';
import icCheckDark from '@/assets/icons/billing/ic-tick-circle-dark.svg';
import icFlat from '@/assets/icons/billing/ic-flat.svg';
import icTime from '@/assets/icons/billing/ic-time.svg';
import icTransfer from '@/assets/icons/billing/ic-transfer.svg';
import icTransferDark from '@/assets/icons/billing/ic-transfer-dark.svg';
import icMinitor from '@/assets/icons/billing/ic-monitor.svg';
import icUser from '@/assets/icons/billing/ic-user.svg';
import icInfor from '@/assets/icons/billing/ic-info.svg';
import icMinitorDark from '@/assets/icons/billing/ic-monitor-dark.svg';
import icUserDark from '@/assets/icons/billing/ic-user-dark.svg';
import icInforDark from '@/assets/icons/billing/ic-info-dark.svg';

const ChoisePlan = ({ setActiveStep }: { setActiveStep: (step: number) => void }) => {
  const { t } = useTranslation('billing');

  const labels = [
    { icon: icCheck, label: t('choice-plan.label-trial') },
    { icon: icFlat, label: t('choice-plan.label-flat') },
    { icon: icTime, label: t('choice-plan.label-cancel') },
  ];

  const handleBuyNow = () => {
    setActiveStep(1);
  };

  const plans = [
    {
      title: t('choice-plan.plan-free-title'),
      desc: t('choice-plan.plan-free-desc'),
      price: '0',
      sections: [
        t('choice-plan.feature-chat-widget'),
        t('choice-plan.feature-shared-inbox'),
        t('choice-plan.feature-contact-form'),
        t('choice-plan.feature-mobile-apps'),
        t('choice-plan.feature-unlimited-conversations'),
        t('choice-plan.feature-ecommerce'),
      ],
    },
    {
      title: t('choice-plan.plan-mini-title'),
      desc: t('choice-plan.plan-mini-desc'),
      price: '45',
      sections: [
        t('choice-plan.feature-chat-widget'),
        t('choice-plan.feature-shared-inbox'),
        t('choice-plan.feature-contact-form'),
        t('choice-plan.feature-mobile-apps'),
        t('choice-plan.feature-unlimited-conversations'),
        t('choice-plan.feature-ecommerce'),
      ],
    },
    {
      title: t('choice-plan.plan-essentials-title'),
      desc: t('choice-plan.plan-essentials-desc'),
      price: '95',
      sections: [
        t('choice-plan.feature-chat-widget'),
        t('choice-plan.feature-shared-inbox'),
        t('choice-plan.feature-contact-form'),
        t('choice-plan.feature-mobile-apps'),
        t('choice-plan.feature-unlimited-conversations'),
        t('choice-plan.feature-ecommerce'),
      ],
    },
    {
      title: t('choice-plan.plan-plus-title'),
      desc: t('choice-plan.plan-plus-desc'),
      price: '295',
      sections: [
        t('choice-plan.feature-chat-widget'),
        t('choice-plan.feature-shared-inbox'),
        t('choice-plan.feature-contact-form'),
        t('choice-plan.feature-mobile-apps'),
        t('choice-plan.feature-unlimited-conversations'),
        t('choice-plan.feature-ecommerce'),
      ],
    },
  ];

  return (
    <S.PlanContainer>
      <S.GroupLabels>
        {labels.map((item, idx) => (
          <S.Label key={idx}>
            <Image preview={false} src={item.icon} />
            <Typography>{item.label}</Typography>
          </S.Label>
        ))}
      </S.GroupLabels>

      <S.PlanList>
        {plans.map((plan, index) => (
          <S.WrapPlanCard key={index}>
            <S.PlanCard isDark={index === plans.length - 1}>
              <S.PlanTitle>{plan.title}</S.PlanTitle>
              <S.PlanDesc>{plan.desc}</S.PlanDesc>
              <S.PlanPriceGroup>
                <S.PlanPrice isDark={index === plans.length - 1}>
                  ${plan.price}
                </S.PlanPrice>
                <span>{t('choice-plan.month')}</span>
              </S.PlanPriceGroup>

              {index !== 0 ? (
                <S.GroupButton>
                  {index === plans.length - 1 ? (
                    <Button
                      onClick={handleBuyNow}
                      type="default"
                      iconPosition="right"
                      icon={<Image preview={false} src={icTransferDark} />}
                    >
                      {t('choice-plan.buy-now')}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleBuyNow}
                      type="primary"
                      iconPosition="right"
                      icon={<Image preview={false} src={icTransfer} />}
                    >
                      {t('choice-plan.buy-now')}
                    </Button>
                  )}
                </S.GroupButton>
              ) : (
                <S.GroupButton>
                  <S.Placholder></S.Placholder>
                </S.GroupButton>
              )}

              <hr />
              <S.Details>
                <S.DetailItem>
                  <Image
                    preview={false}
                    src={index !== plans.length - 1 ? icMinitor : icMinitorDark}
                  />
                  {t('choice-plan.seats-included')}
                  <Image
                    preview={false}
                    src={index !== plans.length - 1 ? icInfor : icInforDark}
                  />
                </S.DetailItem>
                <S.DetailItem>
                  <Image
                    preview={false}
                    src={index !== plans.length - 1 ? icUser : icUserDark}
                  />
                  {t('choice-plan.profiles-included')}
                  <Image
                    preview={false}
                    src={index !== plans.length - 1 ? icInfor : icInforDark}
                  />
                </S.DetailItem>
              </S.Details>

              <hr />
              <S.SectionList isDark={index === plans.length - 1}>
                {plan.sections.map((section, idx) => (
                  <li key={idx}>
                    <Image
                      preview={false}
                      src={index !== plans.length - 1 ? icCheck : icCheckDark}
                    />
                    {section}
                  </li>
                ))}
              </S.SectionList>
            </S.PlanCard>
          </S.WrapPlanCard>
        ))}
      </S.PlanList>
    </S.PlanContainer>
  );
};

export default ChoisePlan;
