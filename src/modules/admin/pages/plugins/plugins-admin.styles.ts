import styled from 'styled-components';
import Button from '@/shared/components/common/Button';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px;

  background-color: ${(props) => props?.theme?.colors?.newtralLightest};
`;

export const FilterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const InputSearch = styled.div`
  width: 300px;
`;

export const FilterPopoverWrap = styled.div`
  display: flex;
  gap: 8px;
`;

export const ButtonFilter = styled(Button)``;

export const ButtonAction = styled(Button)``;

export const ActionGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActionItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
