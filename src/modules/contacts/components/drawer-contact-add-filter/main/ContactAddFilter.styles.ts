import Button from '@/shared/components/common/Button';
import { Drawer } from 'antd';

import { styled } from 'styled-components';

export const ContactAddFilterContainer = styled.section``;

export const DrawerContent = styled(Drawer)`
  height: 90%;

  .ant-drawer-header {
    display: none;
  }

  .ant-drawer-body {
    padding: 24px;

    @media ${(props) => props?.theme?.breakpoints?.mdMax} {
      padding: 12px;
    }
  }
`;

export const HeaderWrap = styled.div`
  position: relative;
  padding-bottom: 12px;
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  .ant-image {
    position: absolute;
    top: 12px;
    right: 0;

    img {
      cursor: pointer;

      &:hover {
        background-color: unset !important;
        transform: rotate(180deg);
        transition: transform 0.3s ease-in-out;
      }

      &:not(:hover) {
        transform: rotate(0deg);
        transition: transform 0.3s ease-in-out;
      }
    }

    @media ${(props) => props?.theme?.breakpoints?.mdMax} {
      top: 0px;
    }
  }
`;

export const Body = styled.div`
  height: calc(100% - 140px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FilterWrap = styled.div``;

export const Footer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  padding-top: 24px;
  border-top: 1px solid ${(props) => props?.theme?.colors?.newtral};
`;

export const BtnCancel = styled(Button)`
  border-color: ${(props) => props?.theme?.colors?.errorDark};
  color: ${(props) => props?.theme?.colors?.errorDark};
`;
