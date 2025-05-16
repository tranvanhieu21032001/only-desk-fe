import { Image, Popover, Layout } from 'antd';

import Button from '../../common/Button';

import styled, { css } from 'styled-components';

export const LayoutWrapper = styled.div`
  display: flex;
  /* height: 100vh; */
  background-color: rgb(235, 241, 246);

  z-index: 2;
`;

export const SiderWrap = styled.div`
  width: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
  background-color: ${(props) => props?.theme?.colors?.primary};

  height: 100vh;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::-webkit-scrollbar {
    width: 0;
    height: 9px;
  }
`;

export const SiderTop = styled.div`
  width: 100%;
`;

export const SiderBottom = styled.div`
  width: 100%;
`;

export const Sidebar = styled.div`
  width: 80px;
  background-color: #ffffff;
  border-right: 1px solid #ddd;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Body = styled.div`
  flex: 1;
  padding: 4px;
  background-color: #edf1f8;
  display: flex;
  overflow: hidden;
`;

export const WorkSpaces = styled.div`
  padding: 34px 0 36px;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  .ant-image {
    position: relative;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -8px;
      height: 1px;
      background: #ddd;
    }
  }

  button {
    border: none !important;
  }
`;

export const Settings = styled.div<{ $isActive?: boolean }>`
  padding: 23px 0;
  width: 100%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  button {
    border: none !important;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 5px;
    bottom: 0px;
    height: 70px;
    background: transparent;
  }

  &:hover {
    background: #ffffff66;

    &:before {
      background: ${(props) => props?.theme?.colors?.errorDark};
    }
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: #ffffff66;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 5px;
        background: ${(props) => props?.theme?.colors?.errorDark};
      }
    `}
`;

export const Profiles = styled.div`
  padding: 23px 0;
  width: 100%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  button {
    border: none !important;
  }
`;

export const LayoutWrap = styled(Layout)`
  height: 100vh;
  width: calc(100% - 60px) !important;
`;

export const PopoverContent = styled.div``;

export const Line = styled.div`
  width: 100%;
  margin: 12px 0;

  border-bottom: 1px solid ${(props) => props.theme.colors.newtral};
`;

export const LineDash = styled.div`
  width: 100%;
  margin: 12px 0;

  border-bottom: 1px dashed ${(props) => props.theme.colors.newtral};
`;

export const PopoverLabel = styled.div`
  margin-top: 12px;
  padding-bottom: 12px;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PopoverLabelWrap = styled.div`
  /* margin-top: 4px;
  padding-bottom: 4px; */

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PopoverLabelWrapNoBorder = styled.div`
  /* margin-top: 4px;
  padding-bottom: 4px; */

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const WorkSpacesCard = styled.div`
  padding: 9px 12px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 12px;

  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.newtral};

  &:hover {
    transition: box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
`;

export const WorkSpacesLabel = styled.div`
  p {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PopoverAction = styled(Button)`
  margin-top: 12px;

  span {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }
`;

export const MenuWrapper = styled.div`
  margin-top: 6px;
`;

export const MenuIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: transparent;
  }

  &:hover:before {
    background: ${(props) => props?.theme?.colors?.errorDark};
  }
`;

export const MenuPopover = styled(Popover)<{ $isActive?: boolean }>`
  cursor: pointer;
  width: fit-content;
  height: fit-content;

  &:hover {
    background: #ffffff66;
  }

  &.ant-popover-open {
    background: #ffffff66;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      background: ${(props) => props?.theme?.colors?.errorDark};
    }
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: #ffffff66;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 5px;
        background: ${(props) => props?.theme?.colors?.errorDark};
      }
    `}
`;

export const MenuIcon = styled.div`
  padding: 23px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChildrenMenuWrap = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  padding: 8px;
  cursor: pointer;
  border-radius: ${(props) => props.theme.radius?.normalRadius};

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.secondaryLight};
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: ${(props) => props?.theme?.colors?.secondaryLight};
    `}
`;

export const ChildrenMenuLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 95%;
`;

export const ChildrenMenuCount = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props?.theme?.colors?.newtral};
  padding: 5px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: ${(props) => props?.theme?.fontSize?.sm};
    color: ${(props) => props?.theme?.colors?.newtralLight};
  }
`;

export const ProfilesWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;

  padding: 13px 12px;
`;

export const AvatarImage = styled.div`
  img,
  svg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }s
`;

export const ProfilesInfo = styled.div``;

export const ProfilesName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .ant-image {
    display: flex;
    align-items: center;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ProfileDetail = styled(Image)`
  cursor: pointer;
`;

export const HeaderWrap = styled.div`
  height: 76px;
  padding: 12px 24px;

  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    padding: 6px 12px;
  }

  header {
    padding: 0px;
    background-color: ${(props) => props?.theme?.colors?.newtralLightest};
  }
`;
