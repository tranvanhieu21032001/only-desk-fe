import { useCallback, useState } from 'react';
import { RcFile } from 'antd/es/upload';
import { FormInstance, message, Progress } from 'antd';

// import { constants } from '@/settings';
import { postRequest } from '@/core/services/requests';
import { patchRequest } from '@/core/services/requests/patchRequest';
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

  const [uploadProgress, setUploadProgress] = useState<number>(0);

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
      formData.append('image', images[0]);
      try {
        setUploadProgress(1);
        const res: any = await postRequest('/file-upload/image', {
          data: formData,
          isFormData: true,
          onUploadProgress: (progressEvent: ProgressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setUploadProgress(percent);
            }
          },
        });
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(0), 400);
        const url = res?.fileUrl;
        if (url) {
          await patchRequest('/users/profile', {
            data: { avatar: url },
          });
          onFields([url]);
        } else {
          onFields([]);
        }
      } catch (error) {
        setUploadProgress(0);
        message.error('Upload image Failed!');
        onFields([]);
      } finally {
        onParams((prev) => ({
          ...prev,
          isLoading: false,
        }));
        currentForm?.setFieldValue(name, []);
      }
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
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          width: 120,
          height: 120,
        }}
      >
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
        {uploadProgress > 0 && uploadProgress < 100 && (
          <Progress
            type="circle"
            percent={uploadProgress}
            width={100}
            strokeColor="#1890ff"
            showInfo={true}
          />
        )}
      </div>
    </>
  );
}

export default UploadImage;
