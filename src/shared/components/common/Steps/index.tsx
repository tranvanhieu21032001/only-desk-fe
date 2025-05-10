import React from 'react';

import * as S from './steps.styles';

import check from '@/assets/icons/inbox/ic-check.svg';

type Step = {
  label: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
};

type StepProgressProps = {
  currentStep: number;
  steps: Step[];
};

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, steps }) => {
  return (
    <S.Container>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <S.StepItem key={index}>
            <S.IconContainer>
              <S.IconWrapper $active={isActive} $completed={isCompleted}>
                {isCompleted ? (
                  <S.CheckIconWrapper $completed={isCompleted}>
                    <img src={check} alt="check" />
                  </S.CheckIconWrapper>
                ) : (
                  step.icon
                )}
              </S.IconWrapper>

              {index < steps.length - 1 && (
                <S.Connector $active={index < currentStep} />
              )}
            </S.IconContainer>
            <S.Label $active={isActive}>{step.label}</S.Label>
          </S.StepItem>
        );
      })}
    </S.Container>
  );
};

export default StepProgress;
