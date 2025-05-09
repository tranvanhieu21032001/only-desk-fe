import { FormInstance, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useCallback } from 'react';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';

// import { constants } from '@/settings';
// import { postRequest } from '@/services/requests';
// import { endpointBase } from '@/services/endpoint';
// import themeColors from '@/styles/themes/default/colors';
// import { formatImagePreview } from '@/utils/formatImage';
import { MAX_IMAGE_UPLOAD } from '@/shared/constant/common';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Typography from '../Typography';

// import uploadIcon from '@/assets/icons/common/camera.svg';
// import removeIcon from '@/assets/icons/common/remove.svg';

import * as S from './upload-multi-images.styles';

import icUpload from '@/assets/icons/contact/ic-select-file.svg';
import Button from '../Button';

interface PropsInterface {
  isLoading?: boolean;
  disabled?: boolean;
  maxSize?: number;
  maxCount?: number;
  label?: string;
  isRequired?: boolean;
  colorLabel?: string;
  currentForm?: FormInstance;
  name?: string;
  onParams: React.Dispatch<
    React.SetStateAction<{ isLoading: boolean; countUpload: number }>
  >;
  onFields: React.Dispatch<React.SetStateAction<string[]>>;
  fields: string[];
}

function UploadMultiImages(props: PropsInterface) {
  const {
    isLoading,
    disabled,
    maxSize = 20,
    maxCount = props.maxCount || MAX_IMAGE_UPLOAD,
    label,
    colorLabel = themeColors?.newtral,
    isRequired,
    currentForm,
    name,
    onParams,
    onFields,
    fields,
  } = props;

  const { t } = useTranslation('common');

  const beforeUpload = (file: RcFile) => {
    const isMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isMaxSize) {
      message.error(`Max size:' ${maxSize}MB!`);
    }
    return isMaxSize;
  };

  const handleUploadMultiImages = useCallback(
    async (images: RcFile[]) => {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('files', image);
      });

      const uploadedImages = images.map((image) => URL.createObjectURL(image));

      //TODO handle api
      // const { data }: any = await postRequest(endpointBase.UPLOAD, {
      //   data: formData,
      //   isFormData: true,
      // });
      // const tempData = [...imagesPreview, ...(data?.file || [])];

      const tempData = [...fields, ...uploadedImages];

      onFields(tempData);
      onParams((prev) => ({
        ...prev,
        isLoading: false,
      }));
      currentForm?.setFieldValue(name, tempData);
    },
    [currentForm, fields, name],
  );

  const onChangeUploadImages = useCallback(
    (file: any) => {
      console.log(file);

      if (file.file.uid === file.fileList?.[file.fileList.length - 1].uid) {
        const originFiles = file.fileList?.map(
          (item: any) => item.originFileObj,
        );
        handleUploadMultiImages(originFiles);
        onParams({ isLoading: false, countUpload: originFiles?.length });
      }
    },
    [handleUploadMultiImages, onParams],
  );

  return (
    <>
      {label && (
        <Typography
          padding="0 0 8px 0"
          variant="caption-small"
          color={colorLabel}
        >
          {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <S.UploadMultiImage
        accept={'image/*'}
        multiple
        maxCount={maxCount}
        beforeUpload={beforeUpload}
        className="avatar-uploader"
        fileList={[]}
        showUploadList={false}
        onChange={onChangeUploadImages}
        disabled={disabled || isLoading}
      >
        <S.UploadImg>
          <ReactSVG src={icUpload} />
        </S.UploadImg>
        <Typography
          fontWeight={fontWeight?.semiBold}
          margin="20px 0 0"
          textAlign="center"
        >
          {t('upload.choose-a-files')}
        </Typography>
        <Typography
          margin="6px 0 20px"
          textAlign="center"
          color={themeColors?.newtralLight}
          variant="caption-small"
        >
          {t('upload.upload-csv')}
        </Typography>

        <S.ButtonUpload>
          <Button>{t('upload.browse-file')}</Button>
        </S.ButtonUpload>
      </S.UploadMultiImage>
    </>
  );
}

export default UploadMultiImages;
