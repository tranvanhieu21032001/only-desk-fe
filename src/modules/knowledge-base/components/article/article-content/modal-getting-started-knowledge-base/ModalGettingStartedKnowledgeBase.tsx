import { useState } from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import StepConfigure from '../modal-getting-started-knowledge-base/step-content/stepconfigure/StepConfigure';
import StepLocale from '../modal-getting-started-knowledge-base/step-content/steplocale/StepLocale';
import StepImport from '../modal-getting-started-knowledge-base/step-content/stepimport/StepImport';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalGettingStartedKnowledgeBase.styles';

import icConfigure from '@/assets/icons/knowledge-base/ic-configure.svg';
import icConfigureActive from '@/assets/icons/knowledge-base/ic-configure.svg';
import icLocale from '@/assets/icons/knowledge-base/ic-locale.svg';
import icLocaleActive from '@/assets/icons/knowledge-base/ic-locale-active.svg';
import icImport from '@/assets/icons/knowledge-base/ic-import.svg';
import icImportActive from '@/assets/icons/knowledge-base/ic-import-active.svg';
import icArrowright from '@/assets/icons/knowledge-base/ic-arrowright.svg';
import icDownload from '@/assets/icons/knowledge-base/ic-download.svg';
import icTick from '@/assets/icons/knowledge-base/ic-tick.svg';

interface ModalGettingStartedKnowledgeBaseProps {
  open: boolean;
  onCancel: () => void;
  onStart: () => void;
}

function ModalGettingStartedKnowledgeBase({
  open,
  onCancel,
  onStart,
}: ModalGettingStartedKnowledgeBaseProps) {
  const { t } = useTranslation('knowledgeBase');
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { icon: icConfigure, activeIcon: icConfigureActive, label: t('article-menu.getting-started-knowledge.configure') },
    { icon: icLocale, activeIcon: icLocaleActive, label: t('article-menu.getting-started-knowledge.locale') },
    { icon: icImport, activeIcon: icImportActive, label: t('article-menu.getting-started-knowledge.import') },
  ];

  const handleContinue = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      onStart();
    }
  };

  return (
    <S.WrapModal>
      <ModalCommon
        open={open}
        onCancel={onCancel}
        showFooter={false}
        width={880}
        rootClassName="modal-getting-started-knowledgebase"
      >
        <S.ModalHeader>
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight.semiBold}>
              {t('article-menu.getting-started-knowledge.title')}
            </Typography>
            <S.ModalDescription>
              <Typography color={themeColors.newtralLight}>
                {t('article-menu.getting-started-knowledge.description')}
              </Typography>
            </S.ModalDescription>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalBody>
          <S.ModalStepsContainer>
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
                  fontWeight={activeStep === index ? fontWeight.semiBold : fontWeight.medium}
                  color={activeStep === index ? '#253A8E' : themeColors.newtralLight}
                >
                  {step.label}
                </Typography>
              </S.StepItem>
            ))}
          </S.ModalStepsContainer>

          <S.ModalStepContent>
            {activeStep === 0 && <StepConfigure />}
            {activeStep === 1 && <StepLocale />}
            {activeStep === 2 && <StepImport />}
          </S.ModalStepContent>
        </S.ModalBody>

        <S.ModalFooter>
          <div>
            <Image src={icDownload} preview={false} />
            <Typography fontWeight={fontWeight.semiBold} color={themeColors.secondaryDark}>
              {t('article-menu.getting-started-knowledge.download-sample')}
            </Typography>
          </div>

          {activeStep !== steps.length - 1 && (
            <div className="button-group">
              <Button onClick={onCancel}>
                {t('article-menu.getting-started-knowledge.cancel')}
              </Button>
              <Button onClick={handleContinue} type="primary">
                {activeStep === steps.length - 1
                  ?"": t('article-menu.getting-started-knowledge.continue')}
                <Image src={icArrowright} width={18} height={18} preview={false} />
              </Button>
            </div>
          )}
        </S.ModalFooter>

      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalGettingStartedKnowledgeBase;
