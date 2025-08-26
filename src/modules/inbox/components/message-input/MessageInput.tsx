import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Image } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from '../../helpers/inbox.logic';
import {
  emojiMap,
  INBOX_TABS,
  TAB_ACTIONS,
} from '../../constants/inbox.constants';
import * as S from './MessageInput.styles';

import file from '@/assets/icons/common/ic-file.svg';
import smile from '@/assets/icons/common/ic-smile.svg';
import send from '@/assets/icons/common/ic-send.svg';

import {
  FilePreview,
  MessageInputProps,
  MessageType,
} from '@/shared/chat-logic/enums/chat.enums';
import FilePreviewList from './components/FilePreviewList';
import ReplyPreview from './components/ReplyPreview';
import EmojiPickerWrapper from './components/EmojiPickerWrapper';

const MessageInput: React.FC<MessageInputProps> = ({
  activeTab,
  selectedReminder,
  setSelectedReminder,
  setActiveTab,
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

  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeTab, selectedReminder]);

  // update filePreview
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

    // upload
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
    if (filePreviews.length > 0) {
      const uploadingFiles = filePreviews.filter((file) => file.uploading);
      if (uploadingFiles.length > 0) return;

      for (const item of filePreviews) {
        if (item.fileUrl) {
          onSendMessage(
            inputValue,
            MessageType.IMAGE,
            { fileUrl: item.fileUrl },
            replyPreview,
          );
        }
      }
      setFilePreviews([]);
      setSelectedReminder?.(null);
      setInputValue('');
      onEndSendMessage?.();
      return;
    }

    if (inputValue.trim()) {
      // console.log('activeTab', activeTab);
      if (activeTab === INBOX_TABS.NOTE) {
        onSendMessage(inputValue, MessageType.NOTE, {}, replyPreview);
      } else if (activeTab === INBOX_TABS.REMINDER) {
        onSendMessage(inputValue, MessageType.REMINDER, {}, replyPreview);
      } else {
        onSendMessage(inputValue, MessageType.TEXT, {}, replyPreview);
      }
      setSelectedReminder?.(null);
      setInputValue('');
      onEndSendMessage?.();
      setActiveTab?.(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;

    Object.entries(emojiMap).forEach(([pattern, emoji]) => {
      const regex = new RegExp(escapeRegex(pattern), 'g');
      value = value.replace(regex, emoji);
    });

    setInputValue(value);
    onInputChange?.(value);
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        position: 'relative',
      }}
    >
      <FilePreviewList filePreviews={filePreviews} removeFile={removeFile} />

      <ReplyPreview replyPreview={replyPreview} onCancel={onEndSendMessage} />

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

        {TAB_ACTIONS.map((action) => {
          if (action.tab === INBOX_TABS.REMINDER) {
            if (activeTab === INBOX_TABS.REMINDER || selectedReminder) {
              return (
                <S.TokenBox key={action.key}>
                  <S.TokenIcon src={action.icon} alt={action.label} />
                  {action.label}
                </S.TokenBox>
              );
            }
            return null;
          }

          if (activeTab === action.tab) {
            return (
              <S.TokenBox key={action.key}>
                <S.TokenIcon src={action.icon} alt={action.label} />
                {action.label}
              </S.TokenBox>
            );
          }

          return null;
        })}

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

      <EmojiPickerWrapper
        show={showEmojiPicker}
        onSelect={handleAddEmoji}
        onClose={() => setShowEmojiPicker(false)}
      />
    </div>
  );
};

export default MessageInput;
