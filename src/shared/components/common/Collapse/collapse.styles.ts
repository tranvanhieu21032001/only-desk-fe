import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top:12px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TwoBarIcon = styled.span`
  display: flex;
  align-items: center;
`;

export const SectionHeader = styled.div`
  font-weight: 600;
  height: 36px;
  font-size: 14px;
  background: #f5f5f5;
  padding: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const CollapseIcon = styled.span<{ $isOpen: boolean }>`
  margin-left: auto;
  transition: transform 0.2s ease;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "0deg" : "180deg")});
  font-size: 12px;
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
