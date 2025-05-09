import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';

import { progressImport } from '../../helpers/contact.data';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { ImportProgressEnums } from '../../helpers/contact.enums';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalImportContact.styles';

import icArrowRight from '@/assets/icons/contact/ic-arrow-right.svg';

interface ModalImportContactProps {
  open: boolean;
  onCancel: () => void;
}

function ModalImportContact({ open, onCancel }: ModalImportContactProps) {
  const { t } = useTranslation('contacts');

  const [step, setStep] = useState<ImportProgressEnums>(
    ImportProgressEnums?.SELECT_FILE,
  );

  return (
    <S.WrapModal>
      <ModalCommon
        open={open}
        onCancel={onCancel}
        showFooter={false}
        width={880}
      >
        <S.ModalHeader>
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-import-contact.import-contact-profile')}
            </Typography>
            <S.ModalDescription>
              <Typography color={themeColors?.newtralLight}>
                {t('modal-import-contact.please-insert-modal-description-here')}
              </Typography>
            </S.ModalDescription>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalContent>
          <S.ProgressContainer>
            <S.ProgressWrap>
              {progressImport?.map((progress) => (
                <S.Progress
                  key={progress?.key}
                  $isDiver={!progress?.icon && !progress?.label}
                  $isActive={step === progress?.key ? progress?.key : undefined}
                >
                  {progress?.icon && (
                    <S.IcProgress
                      $isActive={
                        step === progress?.key ? progress?.key : undefined
                      }
                    >
                      <ReactSVG
                        src={progress?.icon}
                        className="progress-icon"
                      />
                    </S.IcProgress>
                  )}
                  {progress?.label && (
                    <Typography
                      fontWeight={fontWeight?.semiBold}
                      color={themeColors?.newtralLight}
                    >
                      {t(`${progress?.label}`)}
                    </Typography>
                  )}
                </S.Progress>
              ))}
            </S.ProgressWrap>
          </S.ProgressContainer>

          <S.Description>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-import-contact.upload-a-csv')}
            </Typography>
            <Typography color={themeColors?.newtralLight}>
              {t('modal-import-contact.you-can-upload')}
            </Typography>
          </S.Description>
        </S.ModalContent>

        <S.ModalFooter>
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-confirm-export.cancel')}
            </Button>
            <Button type="primary" onClick={onCancel}>
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-import-contact.continue')}
              </Typography>
              <Image src={icArrowRight} preview={false} />
            </Button>
          </S.ActionWrap>
        </S.ModalFooter>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalImportContact;
