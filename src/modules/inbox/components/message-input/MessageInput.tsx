import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Image, Spin } from 'antd';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { LoadingOutlined } from '@ant-design/icons';

import { emitTypingStart, emitTypingStop } from '@/core/services/socket/socket';

import { uploadFile } from '../../helpers/inbox.logic';
import { InboxMessageType } from '@/modules/settings/helpers/enums/inbox.enums';
import { INBOX_TABS } from '../../constants/inbox.constants';
import * as S from './MessageInput.styles';

import file from '@/assets/icons/common/ic-file.svg';
import smile from '@/assets/icons/common/ic-smile.svg';
import send from '@/assets/icons/common/ic-send.svg';
import bellWhite from '@/assets/icons/inbox/ic-bell-white.svg';
import editWhite from '@/assets/icons/inbox/ic-edit-white.svg';
// import icPdf from '@/assets/icons/inbox/ic-pdf.svg';
// import icCheck from '@/assets/icons/inbox/ic-check.svg';
import icCloseImage from '@/assets/icons/inbox/ic-close-image.svg';
import noteWhite from '@/assets/icons/inbox/ic-note-white.svg';
// import trash from '@/assets/icons/inbox/ic-trash.svg';

interface MessageInputProps {
  activeTab: string | null;
  selectedReminder: string | null;
  inputValue: string;
  setInputValue: (val: string) => void;
  setActiveTab: (val: string | null) => void;
  setSelectedReminder: (val: string | null) => void;
  onSendMessage: (val: string, type?: InboxMessageType, metadata?: any) => void;
}

interface FilePreview {
  id: string;
  type: 'image';
  fileUrl: string;
  localUrl: string;
  fileName: string;
  uploading: boolean;
  progress: number;
  originFile?: File;
}

const MessageInput: React.FC<MessageInputProps> = ({
  activeTab,
  selectedReminder,
  inputValue,
  setInputValue,
  // setActiveTab,
  onSendMessage,
}) => {
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('conversationId');
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);

  // Debounced typing emit
  const debouncedTypingStart = useRef(
    debounce(() => {
      if (conversationId) {
        emitTypingStart(conversationId);
      }
    }, 400),
  ).current;
  const debouncedTypingStop = useRef(
    debounce(() => {
      if (conversationId) {
        emitTypingStop(conversationId);
      }
    }, 1000),
  ).current;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab, selectedReminder]);

  useEffect(() => {
    return () => {
      debouncedTypingStart.cancel();
      debouncedTypingStop.cancel();
    };
  }, [debouncedTypingStart, debouncedTypingStop]);

  const updateFilePreview = (id: string, updater: (item: FilePreview) => Partial<FilePreview>) => {
    setFilePreviews(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updater(item) } : item
      )
    );
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith('image/'),
    );

    const previews: FilePreview[] = imageFiles.map((file) => {
      const id = uuidv4();
      return {
        id,
        type: 'image',
        fileName: file.name,
        fileUrl: '',
        localUrl: URL.createObjectURL(file),
        uploading: true,
        progress: 0,
        originFile: file,
      };
    });

    setFilePreviews((prev) => [...prev, ...previews]);

    // Start uploading each photo, always update by id
    previews.forEach(async (previewItem) => {
      try {
        if (!previewItem.originFile) return;
        const res = await uploadFile(previewItem.originFile, (percent) => {
          updateFilePreview(previewItem.id, () => ({ progress: percent }));
        });
        if (res?.fileUrl) {
          updateFilePreview(previewItem.id, () => ({
            fileUrl: res.fileUrl || '',
            uploading: false,
            progress: 100,
          }));
        } else {
          updateFilePreview(previewItem.id, () => ({ uploading: false }));
        }
      } catch (err) {
        updateFilePreview(previewItem.id, () => ({ uploading: false }));
      }
    });

    // Reset input
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setFilePreviews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSend = async () => {
    if (filePreviews.length > 0) {
      const uploadingFiles = filePreviews.filter((file) => file.uploading);
      if (uploadingFiles.length > 0) {
        return;
      }

      for (const item of filePreviews) {
        if (item.fileUrl) {
          onSendMessage('text image', InboxMessageType.Image, {
            fileUrl: item.fileUrl,
          });
        } else {
          // Handle error
        }
      }

      setFilePreviews([]);
      return;
    }

    if (inputValue.trim()) {
      if (activeTab === INBOX_TABS.NOTE) {
        onSendMessage(inputValue, InboxMessageType.Note);
      } else {
        onSendMessage(inputValue, InboxMessageType.Text);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const TAB_ACTIONS = [
    {
      key: INBOX_TABS.EDIT,
      icon: editWhite,
      label: 'Edit',
      tab: INBOX_TABS.EDIT,
    },
    {
      key: INBOX_TABS.REMINDER,
      icon: bellWhite,
      label: 'Reminder',
      tab: INBOX_TABS.REMINDER,
    },
    {
      key: INBOX_TABS.NOTE,
      icon: noteWhite,
      label: 'Note',
      tab: INBOX_TABS.NOTE,
    },
  ];

  return (
    <S.InputRow>
      {/* Button to trigger file input */}
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
                <S.RemoveImageButton
                  onClick={() => removeFile(item.id)}
                  title="Remove"
                >
                  <img src={icCloseImage} alt="remove" />
                </S.RemoveImageButton>
              )}
            </S.ImagePreviewBox>
          ))}
        </S.FilePreviewWrapper>
      )}

      {inputValue && TAB_ACTIONS.map(action => (
        activeTab === action.tab && (
          <S.TokenBox key={action.key}>
            <S.TokenIcon src={action.icon} alt={action.label} />
            {action.label}
          </S.TokenBox>
        )
      ))}

      <S.InputWrapper>
        <S.Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={async (e) => {
            if (e.key === 'Enter') {
              await handleSend();
              debouncedTypingStop();
            }
          }}
          placeholder="Messages..."
          style={{ flex: 1 }}
        />
      </S.InputWrapper>

      <S.InputIconsWrapper>
        <Image src={smile} preview={false} />
        <Image
          src={send}
          preview={false}
          onClick={handleSend}
          style={{ cursor: 'pointer' }}
        />
      </S.InputIconsWrapper>
    </S.InputRow>
  );
};

export default MessageInput;
