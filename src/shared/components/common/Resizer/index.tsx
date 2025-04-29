import React, { useCallback } from 'react';

import { DEFAULT_RESIZER_CONFIG } from '@/core/settings/constants';

import * as S from './resizer.styles'

interface ResizerProps {
  onResize: (newWidth: number) => void;
  minWidth?: number;
  maxWidth?: number;
}

const Resizer: React.FC<ResizerProps> = ({
  onResize,
  minWidth = DEFAULT_RESIZER_CONFIG.MIN_WIDTH,
  maxWidth = DEFAULT_RESIZER_CONFIG.MAX_WIDTH
}) => {
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.body.style.cursor = 'col-resize';
    const resizerElement = e.currentTarget;
    resizerElement.classList.add('resizing');

    const startX = e.pageX;
    const startWidth = (resizerElement.previousElementSibling as HTMLElement)?.offsetWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.pageX - startX;
      const newWidth = Math.min(Math.max(startWidth + deltaX, minWidth), maxWidth);
      onResize(newWidth);
    };

    const handleMouseUp = () => {
      document.body.style.cursor = '';
      resizerElement.classList.remove('resizing');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onResize, minWidth, maxWidth]);

  return <S.ResizerBar onMouseDown={handleMouseDown} />;
};

export default Resizer; 