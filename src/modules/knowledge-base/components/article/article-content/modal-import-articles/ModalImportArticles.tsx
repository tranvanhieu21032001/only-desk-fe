import { useState } from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import StepConfigure from '../modal-import-articles/step-content/stepconfigure/StepConfigure';
import StepImport from '../modal-import-articles/step-content/stepimport/StepImport';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalImportArticles.styles';

import icConfigure from '@/assets/icons/knowledge-base/ic-configure.svg';
import icConfigureActive from '@/assets/icons/knowledge-base/ic-configure.svg';
import icImport from '@/assets/icons/knowledge-base/ic-import.svg';
import icImportActive from '@/assets/icons/knowledge-base/ic-import-active.svg';
import icArrowright from '@/assets/icons/knowledge-base/ic-arrowright.svg';
import icTick from '@/assets/icons/knowledge-base/ic-tick.svg';

interface ImportArticlesProps {
    open: boolean;
    onCancel: () => void;
    onStart: () => void;
}

function ImportArticles({
    open,
    onCancel,
    onStart,
}: ImportArticlesProps) {
    const { t } = useTranslation('knowledgeBase');
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { icon: icConfigure, activeIcon: icConfigureActive, label: t('article-menu.import-articles.configure') },
        { icon: icImport, activeIcon: icImportActive, label: t('article-menu.import-articles.import') },
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
                rootClassName="modal-import-articlesbase"
            >
                <S.ModalHeader>
                    <S.ModalHeaderContent>
                        <Typography fontWeight={fontWeight.semiBold}>
                            {t('article-menu.import-articles.import-articles-title')}
                        </Typography>
                        <S.ModalDescription>
                            <Typography color={themeColors.newtralLight}>
                                {t('article-menu.import-articles.import-articles-description')}
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
                        {activeStep === 1 && <StepImport />}
                    </S.ModalStepContent>
                </S.ModalBody>

                <S.ModalFooter>
                    <div className="button-group">
                        <Button onClick={onCancel}>
                            {t('article-menu.import-articles.cancel')}
                        </Button>
                        {activeStep === 1 ? <Button onClick={handleContinue} type="primary">
                            {t('article-menu.import-articles.submit')}
                        </Button> : <Button onClick={handleContinue} type="primary">
                            {t('article-menu.import-articles.continue')}
                            <Image src={icArrowright} width={18} height={18} preview={false} />
                        </Button>}
                    </div>
                </S.ModalFooter>

            </ModalCommon>
        </S.WrapModal>
    );
}

export default ImportArticles;
