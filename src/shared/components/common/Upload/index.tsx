import { useCallback } from 'react';
import { RcFile } from 'antd/es/upload';
import { FormInstance, message } from 'antd';

// import { constants } from '@/settings';
// import { postRequest } from '@/services/requests';
// import { endpointBase } from '@/services/endpoint';
// import themeColors from '@/styles/themes/default/colors';
// import { formatImagePreview } from '@/utils/formatImage';
import { MAX_IMAGE_UPLOAD } from '@/shared/constant/common';
import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '../Typography';

// import uploadIcon from '@/assets/icons/common/camera.svg';
// import removeIcon from '@/assets/icons/common/remove.svg';

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
    React.SetStateAction<{ isLoading: boolean; countUpload: number }>
  >;
  onFields: React.Dispatch<React.SetStateAction<string[]>>;
  fields: string[];
  content?: React.ReactNode;
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
    onFields,
    fields,
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

      onFields(uploadedImages);
      onParams((prev) => ({
        ...prev,
        isLoading: false,
      }));
      currentForm?.setFieldValue(name, uploadedImages);
    },
    [currentForm, fields, name],
  );

  const onChangeUploadImages = useCallback(
    (file: any) => {
      if (file.file) {
        onParams({ isLoading: true, countUpload: 1 });
        const originFiles = file.file?.originFileObj;

        handleUploadMultiImages([originFiles]);
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
