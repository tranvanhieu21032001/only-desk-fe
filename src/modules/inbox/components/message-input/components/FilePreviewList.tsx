import React from 'react';
import { Image, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as S from '../MessageInput.styles';
import icCloseImage2 from '@/assets/icons/inbox/ic-close-image.svg';
import { FilePreview } from '@/shared/chat-logic/enums/chat.enums';

interface FilePreviewListProps {
  filePreviews: FilePreview[];
  removeFile: (id: string) => void;
}

const FilePreviewList: React.FC<FilePreviewListProps> = ({ filePreviews, removeFile }) => {
  if (!filePreviews.length) return null;

  return (
    <S.FilePreviewWrapper>
      {filePreviews.map((item) => (
        <S.ImagePreviewBox key={item.id}>
          <S.ImagePreview>
            <Image src={item.localUrl} alt={item.fileName} />
          </S.ImagePreview>
          {item.uploading ? (
            <S.ProgressWrapper>
              <Spin
                indicator={
                  <LoadingOutlined style={{ fontSize: 26, color: '#fff' }} spin />
                }
              />
            </S.ProgressWrapper>
          ) : (
            <S.RemoveImageButton2 onClick={() => removeFile(item.id)} title="Remove">
              <img src={icCloseImage2} alt="remove" />
            </S.RemoveImageButton2>
          )}
        </S.ImagePreviewBox>
      ))}
    </S.FilePreviewWrapper>
  );
};

export default FilePreviewList;
