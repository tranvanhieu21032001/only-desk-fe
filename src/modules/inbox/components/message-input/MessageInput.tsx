import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Image, Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { LoadingOutlined } from '@ant-design/icons';
import { uploadFile } from '../../helpers/inbox.logic';
import { INBOX_TABS, TAB_ACTIONS } from '../../constants/inbox.constants';
import * as S from './MessageInput.styles';
import file from '@/assets/icons/common/ic-file.svg';
import smile from '@/assets/icons/common/ic-smile.svg';
import send from '@/assets/icons/common/ic-send.svg';
import icCloseImage from '@/assets/icons/common/ic-close-message.svg';
import icCloseImage2 from '@/assets/icons/inbox/ic-close-image.svg';
import icImage from '@/assets/icons/common/ic-image.svg';
import {
  FilePreview,
  MessageInputProps,
  MessageType,
} from '@/shared/chat-logic/enums/chat.enums';

import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const MessageInput: React.FC<MessageInputProps> = ({
  activeTab,
  selectedReminder,
  inputValue,
  setInputValue,
  onSendMessage,
  onInputChange,
  replyPreview,
  onEndSendMessage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeTab, selectedReminder]);

  const updateFilePreview = (
    id: string,
    updater: (item: FilePreview) => Partial<FilePreview>,
  ) => {
    setFilePreviews((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updater(item) } : item,
      ),
    );
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith('image/'),
    );
    const previews: FilePreview[] = imageFiles.map((file) => ({
      id: uuidv4(),
      type: 'image',
      fileName: file.name,
      fileUrl: '',
      localUrl: URL.createObjectURL(file),
      uploading: true,
      progress: 0,
      originFile: file,
    }));

    setFilePreviews((prev) => [...prev, ...previews]);

    previews.forEach(async (item) => {
      if (!item.originFile) return;
      try {
        const res = await uploadFile(item.originFile, (percent) => {
          updateFilePreview(item.id, () => ({ progress: percent }));
        });
        updateFilePreview(item.id, () => ({
          fileUrl: res?.fileUrl || '',
          uploading: false,
          progress: 100,
        }));
      } catch {
        updateFilePreview(item.id, () => ({ uploading: false }));
      }
    });

    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setFilePreviews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSend = async () => {
    const replyId = replyPreview?.id;

    if (filePreviews.length > 0) {
      const uploadingFiles = filePreviews.filter((file) => file.uploading);
      if (uploadingFiles.length > 0) return;

      for (const item of filePreviews) {
        if (item.fileUrl) {
          onSendMessage(
            inputValue,
            MessageType.IMAGE,
            { fileUrl: item.fileUrl },
            replyId,
          );
        }
      }

      setFilePreviews([]);
      onEndSendMessage?.();
      return;
    }

    if (inputValue.trim()) {
      if (activeTab === INBOX_TABS.NOTE) {
        onSendMessage(inputValue, MessageType.NOTE, {}, replyId);
      } else {
        onSendMessage(inputValue, MessageType.TEXT, {}, replyId);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    onInputChange?.(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAddEmoji = (emoji: any) => {
    setInputValue(inputValue + emoji.native);
    setShowEmojiPicker(false);
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
      {/* File Previews */}
      {filePreviews.length > 0 && (
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
                      <LoadingOutlined
                        style={{ fontSize: 26, color: '#fff' }}
                        spin
                      />
                    }
                  />
                </S.ProgressWrapper>
              ) : (
                <S.RemoveImageButton2
                  onClick={() => removeFile(item.id)}
                  title="Remove"
                >
                  <img src={icCloseImage2} alt="remove" />
                </S.RemoveImageButton2>
              )}
            </S.ImagePreviewBox>
          ))}
        </S.FilePreviewWrapper>
      )}

      {/* Reply Preview */}
      {replyPreview && (
        <S.ReplyContainer>
          <S.ReplyBox isImage={replyPreview.type === MessageType.IMAGE}>
            {replyPreview.type === MessageType.IMAGE ? (
              <S.ReplyTextWrapper isImage>
                <div>
                  <S.ReplyName>{replyPreview.name || 'Guest'}</S.ReplyName>
                  <S.ReplySnippet>
                    <img src={icImage} alt="image icon" />
                    Image
                  </S.ReplySnippet>
                  <S.ReplySnippet>{replyPreview.snippetText}</S.ReplySnippet>
                </div>
                <Image
                  src={replyPreview.snippetUrl}
                  alt="reply image"
                  height={80}
                  style={{
                    objectFit: 'cover',
                    borderRadius: 4,
                  }}
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
          <S.RemoveImageButton onClick={onEndSendMessage} title="Remove">
            <img src={icCloseImage} alt="remove" />
          </S.RemoveImageButton>
        </S.ReplyContainer>
      )}

      {/* Input Row */}
      <S.InputRow>
        <S.FileInputLabel>
          <Image src={file} preview={false} />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </S.FileInputLabel>

        {TAB_ACTIONS.map(
          (action) =>
            activeTab === action.tab && (
              <S.TokenBox key={action.key}>
                <S.TokenIcon src={action.icon} alt={action.label} />
                {action.label}
              </S.TokenBox>
            ),
        )}

        <S.InputWrapper>
          <S.Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Messages..."
            style={{ flex: 1 }}
          />
        </S.InputWrapper>

        <S.InputIconsWrapper>
          <Image
            src={smile}
            preview={false}
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            style={{ cursor: 'pointer' }}
          />
          <Image
            src={send}
            preview={false}
            onClick={handleSend}
            style={{ cursor: 'pointer' }}
          />
        </S.InputIconsWrapper>
      </S.InputRow>

      {showEmojiPicker && (
        <div style={{ position: 'absolute', bottom: '40px', right: '0px', zIndex: 999 }}>
          <Picker data={data} onEmojiSelect={handleAddEmoji} theme="light" />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
