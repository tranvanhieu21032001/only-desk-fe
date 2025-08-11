import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import * as S from './ChangePlan.styles';

import icArrow from '@/assets/icons/billing/ic-arrow-left.svg';
import icChoise from '@/assets/icons/billing/ic-verify.svg';
import icChoiseActive from '@/assets/icons/billing/ic-verify.svg';
import icCard from '@/assets/icons/billing/ic-card.svg';
import icCardActive from '@/assets/icons/billing/ic-card-active.svg';
import icTick from '@/assets/icons/billing/ic-tick.svg';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import Typography from '@/shared/components/common/Typography';
import ChoisePlan from './Content/choise-plan/ChoisePlan';
import PaymentComponent from './Content/Payment/PaymentComponent';

const ChangePlan = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('billing');
  const [activeStep, _setActiveStep] = useState(0);

  const handleBack = () => {
    navigate('/setting/billing');
  };

  const steps = [
    { icon: icChoise, activeIcon: icChoiseActive, label: t('billing-menu.step-choice') },
    { icon: icCard, activeIcon: icCardActive, label: t('billing-menu.step-payment') },
  ];

  return (
    <S.ChangePlanInformationContainer>
      <S.ChangePlanInformation>
        <S.BackToPlan onClick={handleBack}>
          <Image preview={false} src={icArrow} />
          {t('billing-menu.plan-subcriptions')}
        </S.BackToPlan>

        <S.Title>{t('billing-menu.build-experiences-title')}</S.Title>

        <S.StepsContainer>
          {steps.map((step, index) => (
            <S.StepItem key={index} active={activeStep === index}>
              <Image
                src={
                  index < activeStep
                    ? icTick
                    : index === activeStep
                      ? step.activeIcon
                      : step.icon
                }
                width={32}
                height={32}
                preview={false}
              />
              <Typography
                fontWeight={
                  activeStep === index
                    ? fontWeight.semiBold
                    : fontWeight.medium
                }
                color={
                  activeStep === index
                    ? '#253A8E'
                    : themeColors.newtralLight
                }
              >
                {step.label}
              </Typography>
            </S.StepItem>
          ))}
        </S.StepsContainer>

        {activeStep === 0 && <ChoisePlan/>}
        {activeStep === 1 && <PaymentComponent />}
      </S.ChangePlanInformation>
    </S.ChangePlanInformationContainer>
  );
};

export default ChangePlan;
