import { Image, Upload } from 'antd';
import styled from 'styled-components';

export const UploadMultiImage = styled(Upload)``;

export const UploadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  img {
    width: 32px;
  }
`;

export const PreviewImageWrap = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

export const ImageWrap = styled.div`
  position: relative;
  width: 80px;
  height: 80px;

  z-index: 1;

  .ant-image-mask {
    border-radius: ${({ theme }) => theme?.radius?.normalRadius};
  }
`;

export const PreviewImage = styled(Image)`
  object-fit: cover;

  width: 80px !important;
  height: 80px !important;
  border-radius: ${({ theme }) => theme?.radius?.mediumRadius};
`;

export const RemoveIcon = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 18px;
  height: 18px;

  img {
    cursor: pointer;
    z-index: 2;
  }
`;

export const ImageLoadingWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SpinWrap = styled.div`
  width: 80px;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
