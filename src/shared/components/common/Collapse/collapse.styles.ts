import styled, { css } from "styled-components";

export const Section = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid ${({ theme }) => theme.colors.newtral};
  border-radius: ${({ theme }) => theme.radius.normalRadius};
  padding: 9px 24px;
  box-shadow: 0px 0px 3px 0px #0000001a;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      border-color: #253a8e !important;
    `}
`;

export const SectionHeader = styled.div`
  font-weight: 600;
  height: 36px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

export const CollapseIcon = styled.span<{ isOpen: boolean }>`
  margin-left: auto;
  transition: transform 0.2s ease;
  transform: rotate(${({ isOpen }) => (isOpen ? "0deg" : "180deg")});
  font-size: 12px;
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
