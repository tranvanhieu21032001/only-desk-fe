import ToastMessage from '@/shared/components/common/ToastMessage';
import { ToastMessageType } from '@/shared/helper/enums/common';
import React, { ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

interface UpgradePromptProps {
  children: ReactNode;
  message: string;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  children,
  message,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    toast(
      React.createElement(ToastMessage, {
        typeToast: ToastMessageType?.WARNING,
        message: message,
      }),
    );
  };

  return (
    <div
      className={`relative transition-all duration-200 ${
        isHovered ? 'opacity-60 blur-sm filter' : 'opacity-80 blur-[1px] filter'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {children}

      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-20">
          <div className="rounded bg-white px-3 py-2 text-sm font-medium shadow-lg">
            🔒 {message}
          </div>
        </div>
      )}
    </div>
  );
};
