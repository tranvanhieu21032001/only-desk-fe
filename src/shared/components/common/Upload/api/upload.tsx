import { postRequest } from '@/core/services/requests';

const prefixBase: string = '';

const endpointUpload = {
  UPLOAD: `${prefixBase}/file-upload/image`,
};

const handleUploadImage = async (
  formData: any,
  onParams: React.Dispatch<
    React.SetStateAction<{
      isLoading: boolean;
      countUpload: number;
      progressPercent: number;
    }>
  >,
) => {
  try {
    onParams({ isLoading: true, countUpload: 1, progressPercent: 0 });
    const res = await postRequest(endpointUpload.UPLOAD, {
      data: formData,
      isFormData: true,
      onUploadProgress: (progressEvent: ProgressEvent) => {
        if (progressEvent.total) {
          let percent = Math?.round(
            (progressEvent?.loaded * 100) / progressEvent?.total,
          );
          percent = percent > 80 ? 80 : percent;
          onParams((prev) => ({
            ...prev,
            progressPercent: percent,
          }));
        }
      },
      enableFlashMessageSuccess: false,
    });

    return res;
  } catch (error) {
    return error;
  } finally {
    onParams((prev) => ({
      ...prev,
      isLoading: false,
      progressPercent: 100,
    }));
  }
};

export { handleUploadImage };
