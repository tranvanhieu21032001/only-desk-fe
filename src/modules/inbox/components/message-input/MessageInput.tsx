import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Image, Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { LoadingOutlined } from '@ant-design/icons';
import { uploadFile } from '../../helpers/inbox.logic';
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
import { MessageType } from '@/shared/chat-logic/enums/chat.enums';
// import trash from '@/assets/icons/inbox/ic-trash.svg';

interface MessageInputProps {
  activeTab: string | null;
  selectedReminder: string | null;
  inputValue: string;
  setInputValue: (val: string) => void;
  setActiveTab: (val: string | null) => void;
  setSelectedReminder: (val: string | null) => void;
  onSendMessage: (
    val: string,
    type?: MessageType,
    replyId?: string,
    metadata?: any,
  ) => void;
  onInputChange?: (val: string) => void;
  replyPreview?: {
    id: string;
    author: string;
    snippet: string;
    type?: MessageType;
    fileUrl?: string;
  } | null;
  onClearReply?: () => void;
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

const escapeRegExp = (s: string) => s.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

const MessageInput: React.FC<MessageInputProps> = ({
  activeTab,
  selectedReminder,
  inputValue,
  setInputValue,
  // setActiveTab,
  onSendMessage,
  onInputChange,
  replyPreview,
  onClearReply,
}) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const injectedReplyIdRef = useRef<string | null>(null);

  useEffect(() => {
    const stripExistingPrefix = () => {
      if (!injectedReplyIdRef.current) return;
      const prefixRe = /^\[Reply:.*?]\s/;
      if (prefixRe.test(inputValue)) {
        setInputValue(inputValue.replace(prefixRe, ''));
      }
      injectedReplyIdRef.current = null;
    };

    if (!replyPreview) {
      stripExistingPrefix();
      return;
    }

    if (replyPreview.type === MessageType.IMAGE) {
      stripExistingPrefix();
      return;
    }

    const newPrefix = `[Reply:${replyPreview.snippet}]\n`;
    const prefixReExact = new RegExp(
      `^\\[Reply:${escapeRegExp(replyPreview.snippet)}\\]\\s`,
    );
    const genericPrefixRe = /^\[Reply:.*?]\n/;

    let nextValue = inputValue;
    if (genericPrefixRe.test(nextValue) && !prefixReExact.test(nextValue)) {
      nextValue = nextValue.replace(genericPrefixRe, newPrefix);
      setInputValue(nextValue);
      injectedReplyIdRef.current = replyPreview.id || 'text';
      return;
    }

    if (!prefixReExact.test(nextValue)) {
      setInputValue(newPrefix + nextValue);
      injectedReplyIdRef.current = replyPreview.id || 'text';
      return;
    }

    injectedReplyIdRef.current = replyPreview.id || 'text';
  }, [replyPreview]);

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
    if (!files || files.length === 0) return;

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

    previews.forEach(async (previewItem) => {
      if (!previewItem.originFile) return;
      try {
        const res = await uploadFile(previewItem.originFile, (percent) => {
          updateFilePreview(previewItem.id, () => ({ progress: percent }));
        });
        updateFilePreview(previewItem.id, () => ({
          fileUrl: res?.fileUrl || '',
          uploading: false,
          progress: 100,
        }));
      } catch {
        updateFilePreview(previewItem.id, () => ({ uploading: false }));
      }
    });

    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setFilePreviews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSend = async () => {
    const metadata: any = {};
    let messageText = inputValue;
    const replyId = replyPreview?.id || undefined;
    console.log("replyId", replyId);

    if (replyPreview && replyPreview.type !== MessageType.IMAGE) {
      const genericPrefixRe = /^\[Reply:.*?]\s/;
      if (genericPrefixRe.test(messageText)) {
        messageText = messageText.replace(genericPrefixRe, '');
      }
    }

    if (filePreviews.length > 0) {
      const uploadingFiles = filePreviews.filter((file) => file.uploading);
      if (uploadingFiles.length > 0) return;

      for (const item of filePreviews) {
        if (item.fileUrl) {
          onSendMessage(messageText, MessageType.IMAGE, replyId, {
            fileUrl: item.fileUrl,
            ...metadata,
          });
        }
      }
      setFilePreviews([]);
      setInputValue('');
      onClearReply?.();
      injectedReplyIdRef.current = null;
      return;
    }

    if (messageText.trim()) {
      onSendMessage(messageText, MessageType.TEXT, replyId, metadata);
      setInputValue('');
      onClearReply?.();
      injectedReplyIdRef.current = null;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(e.currentTarget.value);
    onInputChange?.(e.currentTarget.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && replyPreview) {
      const cursorAtStart =
        (e.currentTarget.selectionStart ?? 0) === 0 &&
        (e.currentTarget.selectionEnd ?? 0) === 0;

      if (cursorAtStart) {
        e.preventDefault();
        const genericPrefixRe = /^\[Reply:.*?]\s/;
        if (genericPrefixRe.test(inputValue)) {
          setInputValue(inputValue.replace(genericPrefixRe, ''));
        }
        injectedReplyIdRef.current = null;
        onClearReply?.();
        return;
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {replyPreview && replyPreview.type === MessageType.IMAGE && (
        <S.FilePreviewWrapper>
          <S.ImagePreviewBox>
            <S.ImagePreview>
              <Image
                src={replyPreview.snippet || replyPreview.fileUrl}
                alt="reply image"
              />
            </S.ImagePreview>
            <S.RemoveImageButton onClick={onClearReply} title="Remove">
              <img src={icCloseImage} alt="remove" />
            </S.RemoveImageButton>
          </S.ImagePreviewBox>
        </S.FilePreviewWrapper>
      )}

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
          {replyPreview && replyPreview?.type !== MessageType.IMAGE ? (
            <S.InputTextarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Messages..."
              style={{ flex: 1 }}
            />
          ) : (
            <S.Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Messages..."
              style={{ flex: 1 }}
            />
          )}
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
    </div>
  );
};

export default MessageInput;
