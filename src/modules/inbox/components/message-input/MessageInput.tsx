import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Image } from 'antd';

import * as S from './MessageInput.styles';

import file from '@/assets/icons/common/ic-file.svg';
import smile from '@/assets/icons/common/ic-smile.svg';
import send from '@/assets/icons/common/ic-send.svg';
import sendWhite from '@/assets/icons/inbox/ic-send-white.svg';
import bellWhite from '@/assets/icons/inbox/ic-bell-white.svg';
import editWhite from '@/assets/icons/inbox/ic-edit-white.svg';
import icPdf from '@/assets/icons/inbox/ic-pdf.svg';
import icCheck from '@/assets/icons/inbox/ic-check.svg';
import icCloseImage from '@/assets/icons/inbox/ic-close-image.svg';
import noteWhite from '@/assets/icons/inbox/ic-note-white.svg';
import trash from '@/assets/icons/inbox/ic-trash.svg';
import icInfoBlue from '@/assets/icons/inbox/ic-info-blue.svg';

interface MessageInputProps {
  activeTab: string | null;
  selectedReminder: string | null;
  inputValue: string;
  setInputValue: (val: string) => void;
  setActiveTab: (val: string | null) => void;
  setSelectedReminder: (val: string | null) => void;
  onSendMessage: (val: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  activeTab,
  selectedReminder,
  inputValue,
  setInputValue,
  setActiveTab,
  onSendMessage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePreviews, setFilePreviews] = useState<
    { type: 'image' | 'pdf'; src?: string; file: File }[]
  >([]);
  const [showSendModal, setShowSendModal] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab, selectedReminder]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      fileArray.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFilePreviews((prev) => [
              ...prev,
              { type: 'image', src: reader.result as string, file },
            ]);
          };
          reader.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
          setFilePreviews((prev) => [...prev, { type: 'pdf', file }]);
        }
      });
    }
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

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

      {/* Display File Previews before the Input Field */}
      {filePreviews.length > 0 && (
        <S.FilePreviewWrapper>
          {filePreviews.map((item, index) =>
            item.type === 'image' ? (
              <S.ImagePreviewBox key={index}>
                <S.ImagePreview src={item.src} alt={`preview-${index}`} />
                <S.RemoveImageButton
                  onClick={() => removeFile(index)}
                  title="Remove"
                >
                  <img
                    src={icCloseImage}
                    alt="remove"
                    style={{ width: 14, height: 14 }}
                  />
                </S.RemoveImageButton>
              </S.ImagePreviewBox>
            ) : (
              <S.PdfPreviewBox key={index}>
                <S.PdfIcon src={icPdf} alt="pdf" />
                <S.PdfInfo>
                  <S.PdfInfoTop>
                    <S.PdfFileName>{item.file.name}</S.PdfFileName>
                    <S.RemovePdfButton
                      onClick={() => removeFile(index)}
                      title="Remove"
                    >
                      <img src={trash} alt="" />
                    </S.RemovePdfButton>
                  </S.PdfInfoTop>
                  <S.PdfStatus>
                    0 KB of {(item.file.size / 1024).toFixed(0)} KB &nbsp;
                    <S.PdfCheckIcon src={icCheck} alt="completed" />
                    <S.PdfCompleted>Completed</S.PdfCompleted>
                  </S.PdfStatus>
                </S.PdfInfo>
              </S.PdfPreviewBox>
            ),
          )}
        </S.FilePreviewWrapper>
      )}

      {inputValue && activeTab === 'Edit' && (
        <S.TokenBox>
          <S.TokenIcon src={editWhite} alt="edit" />
          Edit
        </S.TokenBox>
      )}

      {inputValue && activeTab === 'Reminder' && (
        <S.TokenBox>
          <S.TokenIcon src={bellWhite} alt="reminder" />
          Reminder
        </S.TokenBox>
      )}

      {inputValue && activeTab === 'Note' && (
        <S.TokenBox>
          <S.TokenIcon src={noteWhite} alt="note" />
          Note
        </S.TokenBox>
      )}

      <S.Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (e.target.value === '') setActiveTab(null);
        }}
        placeholder="Messages..."
        style={{ flex: 1 }}
      />

      <S.InputIconsWrapper>
        <Image src={smile} preview={false} />
        <Image
          src={send}
          preview={false}
          onClick={() => setShowSendModal(true)}
          style={{ cursor: 'pointer' }}
        />
      </S.InputIconsWrapper>

      {showSendModal && (
        <S.SendMessageModalOverlay>
          <S.SendMessageModalWrapper>
            <S.SendMessageModalHeader>
              <S.SendMessageModalIcon src={icInfoBlue} alt="info" />
              <S.SendMessageModalTitle>Send Message</S.SendMessageModalTitle>
            </S.SendMessageModalHeader>
            <S.SendMessageModalDesc>
              This user is now offline, meaning that this message will be sent
              via email once you confirm. It won't be editable.
            </S.SendMessageModalDesc>
            <S.FooterPaddingLine />
            <S.SendMessageModalFooter>
              <S.SendMessageModalCheckboxRow>
                <S.SendMessageModalCheckbox
                  type="checkbox"
                  id="dont-show-again"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                />
                <S.SendMessageModalCheckboxLabel htmlFor="dont-show-again">
                  Don't show it again
                </S.SendMessageModalCheckboxLabel>
              </S.SendMessageModalCheckboxRow>
              <S.SendMessageModalButton onClick={() => {
                onSendMessage(inputValue);
                setShowSendModal(false);
              }}>
                <img src={sendWhite} />
                Send Message
              </S.SendMessageModalButton>
            </S.SendMessageModalFooter>
          </S.SendMessageModalWrapper>
        </S.SendMessageModalOverlay>
      )}
    </S.InputRow>
  );
};

export default MessageInput;
