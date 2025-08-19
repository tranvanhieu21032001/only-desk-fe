import React, { useEffect, useRef } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface EmojiPickerWrapperProps {
  show: boolean;
  onSelect: (emoji: any) => void;
  onClose: () => void;
}

const EmojiPickerWrapper: React.FC<EmojiPickerWrapperProps> = ({ show, onSelect, onClose }) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (show) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show]);

  if (!show) return null;

  return (
    <div ref={pickerRef} style={{ position: 'absolute', bottom: 40, right: 0, zIndex: 999 }}>
      <Picker data={data} onEmojiSelect={onSelect} theme="light" />
    </div>
  );
};

export default EmojiPickerWrapper;
