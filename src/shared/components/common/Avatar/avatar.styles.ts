import styled from "styled-components";

export const AvatarWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const FlagIcon = styled.img`
  position: absolute;
  top: -4px;
  left: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
`;

export const Status = styled.div<{ online?: boolean }>`
  position: absolute;
  right: -2px;
  top: 26px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ online }) => (online ? "#4CAF50" : "#ccc")};
  border: 2px solid #fff;
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CustomTooltip = styled.div`
  position: absolute;
  bottom: -66px;
  left: 200%;
  transform: translateX(-50%);
  background: #333333;
  padding: 12px 16px;
  border-radius: 12px;
  display: none;
  z-index: 1000;
  min-width: 180px;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #333333;
  }

  ${AvatarWrapper}:hover & {
    display: block;
  }
`;

export const TooltipStatus = styled.div`
  color: #ffffff;
  font-size: 12px;
  line-height: 20px;
  line-height: 1.4;
  font-weight: 500;
`;

export const TooltipLastActive = styled.div`
  color: #ffffff;
  line-height: 20px;
  font-size: 12px;
  font-style: italic;
  line-height: 1.4;
  opacity: 0.9;
`;
