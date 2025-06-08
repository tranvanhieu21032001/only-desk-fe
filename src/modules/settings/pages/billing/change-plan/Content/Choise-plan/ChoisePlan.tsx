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
    { icon: icCheck, label: t('choise-plan.label-trial') },
    { icon: icFlat, label: t('choise-plan.label-flat') },
    { icon: icTime, label: t('choise-plan.label-cancel') },
  ];

  const handleBuyNow = () => {
    setActiveStep(1);
  };

  const plans = [
    {
      title: t('choise-plan.plan-free-title'),
      desc: t('choise-plan.plan-free-desc'),
      price: '0',
      sections: [
        t('choise-plan.feature-chat-widget'),
        t('choise-plan.feature-shared-inbox'),
        t('choise-plan.feature-contact-form'),
        t('choise-plan.feature-mobile-apps'),
        t('choise-plan.feature-unlimited-conversations'),
        t('choise-plan.feature-ecommerce'),
      ],
    },
    {
      title: t('choise-plan.plan-mini-title'),
      desc: t('choise-plan.plan-mini-desc'),
      price: '45',
      sections: [
        t('choise-plan.feature-chat-widget'),
        t('choise-plan.feature-shared-inbox'),
        t('choise-plan.feature-contact-form'),
        t('choise-plan.feature-mobile-apps'),
        t('choise-plan.feature-unlimited-conversations'),
        t('choise-plan.feature-ecommerce'),
      ],
    },
    {
      title: t('choise-plan.plan-essentials-title'),
      desc: t('choise-plan.plan-essentials-desc'),
      price: '95',
      sections: [
        t('choise-plan.feature-chat-widget'),
        t('choise-plan.feature-shared-inbox'),
        t('choise-plan.feature-contact-form'),
        t('choise-plan.feature-mobile-apps'),
        t('choise-plan.feature-unlimited-conversations'),
        t('choise-plan.feature-ecommerce'),
      ],
    },
    {
      title: t('choise-plan.plan-plus-title'),
      desc: t('choise-plan.plan-plus-desc'),
      price: '295',
      sections: [
        t('choise-plan.feature-chat-widget'),
        t('choise-plan.feature-shared-inbox'),
        t('choise-plan.feature-contact-form'),
        t('choise-plan.feature-mobile-apps'),
        t('choise-plan.feature-unlimited-conversations'),
        t('choise-plan.feature-ecommerce'),
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
                <span>{t('choise-plan.month')}</span>
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
                      {t('choise-plan.buy-now')}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleBuyNow}
                      type="primary"
                      iconPosition="right"
                      icon={<Image preview={false} src={icTransfer} />}
                    >
                      {t('choise-plan.buy-now')}
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
                  {t('choise-plan.seats-included')}
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
                  {t('choise-plan.profiles-included')}
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
