import { useCallback, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';
import { Image, Switch, Tabs, TabsProps } from 'antd';
import { isEmpty } from 'lodash';

import { proceedMockup, progressImport } from '../../../helpers/contact.data';
import themeColors from '@/shared/styles/themes/default/colors';
import { TabConfigureEnums } from '@/shared/helper/enums/contacts';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { ImportProgressEnums } from '../../../helpers/contact.enums';

import Button from '@/shared/components/common/Button';
import ConfigureTable from '../configure-table/ConfigureTable';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';
import CardFilePreview from '../card-file-preview/CardFilePreview';
import UploadMultiImages from '@/shared/components/common/UploadMultiImages';

import * as S from './ModalImportContact.styles';

import icArrowRight from '@/assets/icons/contact/ic-arrow-right.svg';
import icTickCircle from '@/assets/icons/contact/ic-tick-circle.svg';
import imgDoneProceed from '@/assets/images/contact/img-proceed.png';
import icDownloadDocumentExample from '@/assets/icons/contact/ic-download-document.svg';

interface ModalImportContactProps {
  open: boolean;
  onCancel: () => void;
}

function ModalImportContact({ open, onCancel }: ModalImportContactProps) {
  const { t } = useTranslation('contacts');

  const [params, setParams] = useState<{
    isLoading: boolean;
    countUpload: number;
  }>({ isLoading: false, countUpload: 0 });
  const [files, setFiles] = useState<string[]>([]);
  const [stepParams, setStepParams] = useState<{
    step: ImportProgressEnums;
    tab?: TabConfigureEnums;
  }>({
    step: ImportProgressEnums?.SELECT_FILE,
    tab: TabConfigureEnums?.ALL,
  });

  const items: TabsProps['items'] = [
    {
      key: TabConfigureEnums?.ALL,
      label: (
        <S.TabsWrap>
          <Typography>{t('modal-import-contact.all')}</Typography>
          <S.CountTabs className="count-tabs">
            <Typography
              variant="caption-small"
              color={themeColors?.newtralLight}
            >
              15
            </Typography>
          </S.CountTabs>
        </S.TabsWrap>
      ),
    },
    {
      key: TabConfigureEnums?.MAPPED,
      label: (
        <S.TabsWrap>
          <Typography>{t('modal-import-contact.mapped')}</Typography>
          <S.CountTabs className="count-tabs">
            <Typography
              variant="caption-small"
              color={themeColors?.newtralLight}
            >
              8
            </Typography>
          </S.CountTabs>
        </S.TabsWrap>
      ),
    },
    {
      key: TabConfigureEnums?.SKIPPED,
      label: (
        <S.TabsWrap>
          <Typography>{t('modal-import-contact.skipped')}</Typography>
          <S.CountTabs className="count-tabs">
            <Typography
              variant="caption-small"
              color={themeColors?.newtralLight}
            >
              7
            </Typography>
          </S.CountTabs>
        </S.TabsWrap>
      ),
    },
  ];

  function handleContinueStep() {
    if (stepParams?.step === ImportProgressEnums?.SELECT_FILE) {
      setStepParams((prev) => ({
        ...prev,
        step: ImportProgressEnums?.CONFIGURE,
      }));
    } else if (stepParams?.step === ImportProgressEnums?.CONFIGURE) {
      setStepParams((prev) => ({
        ...prev,
        step: ImportProgressEnums?.PROCEED,
      }));
    } else {
      onCancel();
    }
  }

  function handleChangeTab(key: string) {
    setStepParams((prev) => ({
      ...prev,
      tab: key as TabConfigureEnums,
    }));
  }

  const renderContentStepUpload = useMemo(() => {
    switch (stepParams?.step) {
      case ImportProgressEnums?.SELECT_FILE:
        return (
          <>
            <S.Description>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t('modal-import-contact.upload-a-csv')}
              </Typography>
              <Typography
                color={themeColors?.newtralLight}
                variant="caption-small"
                margin="4px 0 0 0"
              >
                {t('modal-import-contact.you-can-upload')}
              </Typography>
            </S.Description>
            {!isEmpty(files) && (
              <S.FilePreviewWrap>
                {files?.map((file, index) => (
                  <CardFilePreview
                    key={index}
                    file={file}
                    onFiles={setFiles}
                    params={params}
                  />
                ))}
              </S.FilePreviewWrap>
            )}
            {params?.isLoading &&
              Array(params?.countUpload)
                ?.fill(0)
                ?.map((_, index) => (
                  <CardFilePreview
                    key={index}
                    file={''}
                    onFiles={setFiles}
                    params={params}
                  />
                ))}
            <S.UploadField>
              <UploadMultiImages
                onParams={setParams}
                onFields={setFiles}
                fields={files}
              />
            </S.UploadField>
          </>
        );
      case ImportProgressEnums?.CONFIGURE:
        return (
          <>
            <S.Description>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t('modal-import-contact.configure-csv-import')}
              </Typography>
              <Typography
                color={themeColors?.newtralLight}
                variant="caption-small"
                margin="4px 0 0 0"
              >
                {t('modal-import-contact.you-can-upload-a-standard')}
              </Typography>
            </S.Description>
            <S.ConfigureContent>
              <S.TabHeaderWrap>
                <Tabs
                  activeKey={stepParams?.tab}
                  defaultActiveKey={stepParams?.tab}
                  items={items}
                  onChange={handleChangeTab}
                />
                <S.TabHeader>
                  <S.Header>
                    <Typography>
                      {t('modal-import-contact.column-separator')}
                    </Typography>
                    <S.ColumnSeparator>,</S.ColumnSeparator>
                  </S.Header>

                  <S.Header>
                    <Typography>
                      {t('modal-import-contact.skip-header')}
                    </Typography>
                    <Switch />
                  </S.Header>
                </S.TabHeader>
              </S.TabHeaderWrap>

              <ConfigureTable />
            </S.ConfigureContent>
          </>
        );
      case ImportProgressEnums?.PROCEED:
        return (
          <>
            <S.Description>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t('modal-import-contact.import-is-being-executed')}
              </Typography>
              <Typography
                color={themeColors?.newtralLight}
                variant="caption-small"
                margin="4px 0 0 0"
              >
                {t(
                  'modal-import-contact.your-contact-profiles-are-being-processed',
                )}
              </Typography>
            </S.Description>
            <S.ProceedImg>
              <Image src={imgDoneProceed} preview={false} />

              <Typography variant="h5" margin="12px 0 0 0">
                {t('modal-import-contact.done-importing')}
              </Typography>

              <S.StatusWrap>
                {proceedMockup?.map((status) => (
                  <S.Status key={status?.key} $status={status?.key}>
                    <Typography variant="caption-small">
                      {status?.count}
                    </Typography>
                    <Typography variant="caption-small">
                      {t(`${status?.label}`)}
                    </Typography>
                  </S.Status>
                ))}
              </S.StatusWrap>
            </S.ProceedImg>
          </>
        );

      default:
        break;
    }
  }, [files, params, stepParams?.step, stepParams?.tab]);

  const renderIconProgress = useCallback(
    (progress: any) => {
      switch (stepParams?.step) {
        case ImportProgressEnums?.SELECT_FILE:
          return (
            <S.IcProgress
              $isActive={
                stepParams?.step === progress?.key ? progress?.key : undefined
              }
            >
              <ReactSVG src={progress?.icon} className="progress-icon" />
            </S.IcProgress>
          );
        case ImportProgressEnums?.CONFIGURE:
          if (progress?.key === ImportProgressEnums?.CONFIGURE) {
            return (
              <S.IcProgress
                $isActive={
                  stepParams?.step === progress?.key ? progress?.key : undefined
                }
              >
                <ReactSVG src={progress?.icon} className="progress-icon" />
              </S.IcProgress>
            );
          } else if (progress?.key === ImportProgressEnums?.SELECT_FILE) {
            return (
              <Image
                src={icTickCircle}
                preview={false}
                width={32}
                height={32}
              />
            );
          }
          return (
            <S.IcProgress
              $isActive={
                stepParams?.step === progress?.key ? progress?.key : undefined
              }
            >
              <ReactSVG src={progress?.icon} className="progress-icon" />
            </S.IcProgress>
          );
        case ImportProgressEnums?.PROCEED:
          if (progress?.key === ImportProgressEnums?.PROCEED) {
            return (
              <S.IcProgress
                $isActive={
                  stepParams?.step === progress?.key ? progress?.key : undefined
                }
              >
                <ReactSVG src={progress?.icon} className="progress-icon" />
              </S.IcProgress>
            );
          }
          return (
            <Image src={icTickCircle} preview={false} width={32} height={32} />
          );

        default:
          break;
      }
    },
    [stepParams?.step],
  );

  function handleCloseImport() {
    onCancel();
  }

  const renderModalFooter = useMemo(() => {
    if (stepParams?.step === ImportProgressEnums?.PROCEED) {
      return (
        <S.ModalFooterProceed>
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-confirm-export.cancel')}
            </Button>
            <Button type="primary" onClick={handleCloseImport}>
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-import-contact.close-import')}
              </Typography>
            </Button>
          </S.ActionWrap>
        </S.ModalFooterProceed>
      );
    } else {
      return (
        <S.ModalFooter>
          <S.DownloadDocument>
            <Typography fontWeight={fontWeight?.semiBold}>
              <ReactSVG src={icDownloadDocumentExample} />
              {t('modal-import-contact.download-this-sample')}
            </Typography>
          </S.DownloadDocument>
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-confirm-export.cancel')}
            </Button>
            <Button
              type="primary"
              onClick={handleContinueStep}
              disabled={isEmpty(files)}
            >
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
      );
    }
  }, [stepParams?.step, files]);

  const renderColorLabelStep = useCallback(
    (progress: any) => {
      switch (stepParams?.step) {
        case ImportProgressEnums?.SELECT_FILE:
          if (progress?.key === ImportProgressEnums?.SELECT_FILE) {
            return '#253a8e';
          }
          return themeColors?.newtralLight;
        case ImportProgressEnums?.CONFIGURE:
          if (progress?.key === ImportProgressEnums?.SELECT_FILE) {
            return themeColors?.primary;
          } else if (progress?.key === ImportProgressEnums?.CONFIGURE) {
            return '#253a8e';
          }
          return themeColors?.newtralLight;
        case ImportProgressEnums?.PROCEED:
          if (progress?.key === ImportProgressEnums?.PROCEED) {
            return '#253a8e';
          }
          return themeColors?.primary;
        default:
          break;
      }
    },
    [stepParams?.step],
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
                  $isActiveDiver={
                    stepParams.step === ImportProgressEnums.CONFIGURE &&
                    progress?.key === ImportProgressEnums.DRIVER
                  }
                  $isActiveDiverSecond={
                    stepParams.step === ImportProgressEnums.PROCEED
                  }
                >
                  {progress?.icon && renderIconProgress(progress)}
                  {progress?.label && (
                    <Typography
                      fontWeight={fontWeight?.semiBold}
                      color={renderColorLabelStep(progress)}
                    >
                      {t(`${progress?.label}`)}
                    </Typography>
                  )}
                </S.Progress>
              ))}
            </S.ProgressWrap>
          </S.ProgressContainer>

          {renderContentStepUpload}
        </S.ModalContent>

        {renderModalFooter}
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalImportContact;
