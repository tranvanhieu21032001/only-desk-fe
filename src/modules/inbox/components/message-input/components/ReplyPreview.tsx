import React from 'react';
import { Image } from 'antd';
import * as S from '../MessageInput.styles';
import icImage from '@/assets/icons/common/ic-image.svg';
import icCloseImage from '@/assets/icons/common/ic-close-message.svg';
import { MessageType } from '@/shared/chat-logic/enums/chat.enums';
import { Message } from '@/shared/chat-logic';
import { getSenderName } from '@/shared/chat-logic/helpers/chat.helper';
import { renderMessageContent } from '@/shared/chat-logic/helpers/message-content.helper';

interface ReplyPreviewProps {
  replyPreview?: Message | null;
  onCancel?: () => void;
  showCancel?: boolean;
}

const ReplyPreview: React.FC<ReplyPreviewProps> = ({
  replyPreview,
  onCancel,
  showCancel = true,
}) => {
  if (!replyPreview) return null;

  return (
    <S.ReplyContainer>
      <S.ReplyBox isImage={replyPreview.type === MessageType.IMAGE}>
        {replyPreview.type === MessageType.IMAGE ? (
          <S.ReplyTextWrapper isImage>
            <div>
              <S.ReplyName>{getSenderName(replyPreview)}</S.ReplyName>
              {replyPreview.content.length == 0 && (
                <S.ReplySnippet>
                  <img src={icImage} alt="image icon" /> Image
                </S.ReplySnippet>
              )}
              <S.ReplySnippet>
                {renderMessageContent(replyPreview.content)}
              </S.ReplySnippet>
            </div>
            <Image
              src={
                replyPreview.type === MessageType.IMAGE
                  ? replyPreview?.metadata?.fileUrl
                  : undefined
              }
              alt="reply image"
              height={80}
              style={{ objectFit: 'cover', borderRadius: 4 }}
              preview={false}
            />
          </S.ReplyTextWrapper>
        ) : (
          <S.ReplyTextWrapper>
            <S.ReplyName>{getSenderName(replyPreview)}</S.ReplyName>
            <S.ReplySnippet>
              {renderMessageContent(replyPreview.content)}
            </S.ReplySnippet>
          </S.ReplyTextWrapper>
        )}
      </S.ReplyBox>
      {showCancel && (
        <S.RemoveImageButton onClick={onCancel} title="Remove">
          <img src={icCloseImage} alt="remove" />
        </S.RemoveImageButton>
      )}
    </S.ReplyContainer>
  );
};

export default ReplyPreview;
