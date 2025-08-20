import React from 'react';
import { Image } from 'antd';
import * as S from '../MessageInput.styles';
import icImage from '@/assets/icons/common/ic-image.svg';
import icCloseImage from '@/assets/icons/common/ic-close-message.svg';
import { MessageType } from '@/shared/chat-logic/enums/chat.enums';

interface ReplyPreviewProps {
  replyPreview: any;
  onCancel?: () => void;
}

const ReplyPreview: React.FC<ReplyPreviewProps> = ({ replyPreview, onCancel }) => {
  if (!replyPreview) return null;

  return (
    <S.ReplyContainer>
      <S.ReplyBox isImage={replyPreview.type === MessageType.IMAGE}>
        {replyPreview.type === MessageType.IMAGE ? (
          <S.ReplyTextWrapper isImage>
            <div>
              <S.ReplyName>{replyPreview.name || 'Guest'}</S.ReplyName>
              <S.ReplySnippet>
                <img src={icImage} alt="image icon" /> Image
              </S.ReplySnippet>
              <S.ReplySnippet>{replyPreview.snippetText}</S.ReplySnippet>
            </div>
            <Image
              src={replyPreview.snippetUrl}
              alt="reply image"
              height={80}
              style={{ objectFit: 'cover', borderRadius: 4 }}
              preview={false}
            />
          </S.ReplyTextWrapper>
        ) : (
          <S.ReplyTextWrapper>
            <S.ReplyName>{replyPreview.name || 'Guest'}</S.ReplyName>
            <S.ReplySnippet>{replyPreview.snippetText}</S.ReplySnippet>
          </S.ReplyTextWrapper>
        )}
      </S.ReplyBox>
      <S.RemoveImageButton onClick={onCancel} title="Remove">
        <img src={icCloseImage} alt="remove" />
      </S.RemoveImageButton>
    </S.ReplyContainer>
  );
};

export default ReplyPreview;
