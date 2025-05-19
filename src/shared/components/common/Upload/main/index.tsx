import { useCallback } from 'react';
import { RcFile } from 'antd/es/upload';
import { FormInstance, message } from 'antd';

import { handleUploadImage } from '../api/upload';
import { MAX_IMAGE_UPLOAD } from '@/shared/constant/common';
import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '../../Typography';

import * as S from './upload-multi-images.styles';

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
    React.SetStateAction<{
      isLoading: boolean;
      countUpload: number;
      progressPercent: number;
    }>
  >;
  fieldName: string;
  content?: React.ReactNode;
  handleUpdateAvatarInformation?: (file: string) => void;
}

function UploadImage(props: PropsInterface) {
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
    fieldName,
    handleUpdateAvatarInformation,
    content,
  } = props;

  const beforeUpload = (file: RcFile) => {
    const isMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isMaxSize) {
      message.error(`Max size:' ${maxSize}MB!`);
    }
    return isMaxSize;
  };

  const handleUploadMultiImages = useCallback(
    async (images: RcFile) => {
      const formData = new FormData();
      formData.append('image', images);

      handleUploadImage(formData, onParams).then((res: any) => {
        if (res?.fileUrl) {
          handleUpdateAvatarInformation &&
            handleUpdateAvatarInformation(res?.fileUrl);
          currentForm?.setFieldValue(fieldName, res?.fileUrl);
        }
      });
    },
    [currentForm, fieldName, name],
  );

  const onChangeUploadImages = useCallback(
    (file: any) => {
      if (file.file) {
        onParams((prev) => ({
          ...prev,
          isLoading: true,
          progressPercent: 1,
        }));
        const originFiles = file.file?.originFileObj;

        handleUploadMultiImages(originFiles);
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
        maxCount={maxCount}
        beforeUpload={beforeUpload}
        className="avatar-uploader"
        fileList={[]}
        showUploadList={false}
        onChange={onChangeUploadImages}
        disabled={disabled || isLoading}
      >
        {content}
      </S.UploadMultiImage>
    </>
  );
}

export default UploadImage;
