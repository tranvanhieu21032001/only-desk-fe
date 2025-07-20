import styled from 'styled-components';

/* ---------- layout container ---------- */
export const ProfileSection = styled.div`
  display: flex;
  // align-items: center;
  gap: 12px;
  position: relative;
`;

/* ---------- avatar & flag ---------- */
export const AvatarWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Avatar = styled.img<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? `${width}px` : '60px')};
  height: ${({ height }) => (height ? `${height}px` : '60px')};
  border-radius: 50%;
  object-fit: cover;
`;

interface FlagIconProps {
  src: string;
}

export const WrappIcon = styled.div<{
  width?: number | string;
  height?: number | string;
}>`
  position: absolute;
  top: -2px;
  left: -2px;
  display: flex;
  width: ${({ width }) =>
    typeof width === 'number' ? `${width}px` : width || '16px'};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height || '16px'};
  border: 1px solid #ffffff;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  overflow: hidden;
`;

export const FlagIcon = styled.div<FlagIconProps>`
  width: 32px;
  height: 32px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-color: white;
  z-index: 2;
`;

export const Status = styled.div<{ isOnline?: boolean }>`
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ isOnline }) => (isOnline ? '#4CAF50' : '#ccc')};
  border: 2px solid #fff;
`;

/* ---------- info texts ---------- */
export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Name = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
`;

export const Email = styled.div`
  font-size: 14px;
  color: #5c5c5c;
  font-weight: 400;
  line-height: 20px;
`;

export const LastActive = styled.div`
  font-size: 10px;
  color: #5c5c5c;
  font-weight: 400;
  line-height: 20px;
`;
