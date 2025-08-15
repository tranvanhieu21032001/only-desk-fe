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
import { FilePreview, MessageInputProps, MessageType } from '@/shared/chat-logic/enums/chat.enums';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replyRef = useRef<HTMLParagraphElement>(null);

  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [selectAllMode, setSelectAllMode] = useState(false);
  const [deleteOnce, setDeleteOnce] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeTab, selectedReminder]);

  useEffect(() => {
    setDeleteOnce(false);
  }, [replyPreview?.id]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        replyRef.current &&
        inputRef.current &&
        !replyRef.current.contains(e.target as Node) &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setSelectAllMode(false);
        window.getSelection()?.removeAllRanges();
      }
    };

    if (selectAllMode) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectAllMode]);

  const updateFilePreview = (id: string, updater: (item: FilePreview) => Partial<FilePreview>) => {
    setFilePreviews(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updater(item) } : item)),
    );
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    const previews: FilePreview[] = imageFiles.map(file => ({
      id: uuidv4(),
      type: 'image',
      fileName: file.name,
      fileUrl: '',
      localUrl: URL.createObjectURL(file),
      uploading: true,
      progress: 0,
      originFile: file,
    }));

    setFilePreviews(prev => [...prev, ...previews]);

    previews.forEach(async item => {
      if (!item.originFile) return;
      try {
        const res = await uploadFile(item.originFile, percent => {
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
    setFilePreviews(prev => prev.filter(item => item.id !== id));
  };

  const handleSend = () => {
    const replyId = replyPreview?.id;

    if (filePreviews.length > 0) {
      if (filePreviews.some(file => file.uploading)) return;
      filePreviews.forEach(item => {
        if (item.fileUrl) {
          onSendMessage(inputValue, MessageType.IMAGE, replyId, { fileUrl: item.fileUrl });
        }
      });
      setFilePreviews([]);
      setInputValue('');
      onClearReply?.();
      return;
    }

    if (inputValue.trim()) {
      onSendMessage(inputValue, MessageType.TEXT, replyId);
      setInputValue('');
      onClearReply?.();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    onInputChange?.(e.currentTarget.value);
    setSelectAllMode(false);
    setDeleteOnce(false);
  };

  const focusReplyToEnd = () => {
    if (replyRef.current) {
      replyRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(replyRef.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      setSelectAllMode(true);
      const selection = window.getSelection();
      if (!selection) return;
      const range = document.createRange();
      if (replyRef.current) range.setStartBefore(replyRef.current);
      else if (inputRef.current) range.setStartBefore(inputRef.current);
      if (inputRef.current) range.setEndAfter(inputRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    if (selectAllMode && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault();
      setInputValue('');
      onClearReply?.();
      setSelectAllMode(false);
    }

    if ((e.key === 'Backspace' || e.key === 'Delete') && replyPreview && inputValue.length === 0) {
      e.preventDefault();
      if (replyPreview.type === MessageType.IMAGE) {
        onClearReply?.();
        setDeleteOnce(false);
        return;
      }
      if (!deleteOnce) {
        focusReplyToEnd();
        setDeleteOnce(true);
        return;
      }
      onClearReply?.();
      setDeleteOnce(false);
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReplyKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      if (deleteOnce) {
        onClearReply?.();
        setDeleteOnce(false);
        setTimeout(() => inputRef.current?.focus(), 0);
        return;
      }
      focusReplyToEnd();
      setDeleteOnce(true);
    }
  };

  const handleCopy = (e: React.ClipboardEvent) => {
    if (selectAllMode && replyPreview) {
      e.preventDefault();
      const fullText =
        (replyPreview.type === MessageType.IMAGE
          ? `[Image: ${replyPreview.fileUrl || replyPreview.snippet}]\n`
          : `[Reply: ${replyPreview.snippet}]\n`) + inputValue;
      e.clipboardData.setData('text/plain', fullText);
    }
  };

  const TAB_ACTIONS = [
    { key: INBOX_TABS.EDIT, icon: editWhite, label: 'Edit', tab: INBOX_TABS.EDIT },
    { key: INBOX_TABS.REMINDER, icon: bellWhite, label: 'Reminder', tab: INBOX_TABS.REMINDER },
    { key: INBOX_TABS.NOTE, icon: noteWhite, label: 'Note', tab: INBOX_TABS.NOTE },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {filePreviews.length > 0 && (
        <S.FilePreviewWrapper>
          {filePreviews.map(item => (
            <S.ImagePreviewBox key={item.id}>
              <S.ImagePreview>
                <Image src={item.localUrl} alt={item.fileName} />
              </S.ImagePreview>
              {item.uploading ? (
                <S.ProgressWrapper>
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 26, color: '#fff' }} spin />} />
                </S.ProgressWrapper>
              ) : (
                <S.RemoveImageButton onClick={() => removeFile(item.id)} title="Remove">
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
          action =>
            activeTab === action.tab && (
              <S.TokenBox key={action.key}>
                <S.TokenIcon src={action.icon} alt={action.label} />
                {action.label}
              </S.TokenBox>
            ),
        )}

        <S.InputWrapper>
          {replyPreview && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px',
                borderRadius: 4,
                marginBottom: 6,
              }}
            >
              {replyPreview.type === MessageType.IMAGE ? (
                <div style={{ position: 'relative', width: 'fit-content' }}>
                  <Image
                    src={replyPreview.snippet || replyPreview.fileUrl}
                    alt="reply image"
                    width={100}
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                    preview={false}
                  />
                  <S.RemoveImageButton onClick={onClearReply} title="Remove">
                    <img src={icCloseImage} alt="remove" />
                  </S.RemoveImageButton>
                </div>
              ) : (
                <p
                  ref={replyRef}
                  contentEditable
                  suppressContentEditableWarning
                  onKeyDown={handleReplyKeyDown}
                  tabIndex={0}
                  style={{
                    flex: 1,
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: 'fit-content',
                    outline: 'none',
                    cursor: 'text',
                    lineHeight: '20px',
                    paddingLeft: '6px',
                    borderLeft: '3px solid #ccc',
                  }}
                >
                  {replyPreview.snippet}
                </p>
              )}
            </div>
          )}

          <S.Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCopy={handleCopy}
            placeholder="Messages..."
            style={{ flex: 1 }}
          />
        </S.InputWrapper>

        <S.InputIconsWrapper>
          <Image src={smile} preview={false} />
          <Image src={send} preview={false} onClick={handleSend} style={{ cursor: 'pointer' }} />
        </S.InputIconsWrapper>
      </S.InputRow>
    </div>
  );
};

export default MessageInput;
