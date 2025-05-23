import { Row } from 'antd';

import Button from '@/shared/components/common/Button';

import { css, styled } from 'styled-components';

export const ContactsContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 12px;

  background-color: ${(props) => props?.theme?.colors?.newtralLightest};
`;

export const BreadcrumbContainer = styled.div`
  padding-top: 12px;

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    padding-top: 0px;
  }
`;

export const ContactContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: space-between;

  padding: 12px 24px 24px;

  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  @media ${(props) => props?.theme?.breakpoints?.xlMax} {
    padding: 12px;

    flex-direction: column;
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ContactInfoWrap = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  img {
    border-radius: 100px;
    min-width: 90px;
  }

  @media ${(props) => props?.theme?.breakpoints?.xlMax} {
    width: 100%;
  }
`;

export const Avatar = styled.div`
  .ant-form-item {
    margin-bottom: 0px;

    img {
      object-fit: cover;
      cursor: pointer;
    }
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 300px;
  }

  @media ${(props) => props?.theme?.breakpoints?.xlMax} {
    h3 {
      max-width: 100%;
      white-space: pre-wrap;
    }
  }
`;

export const FilterPopoverWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    flex-wrap: wrap;
  }
`;

export const ButtonFilter = styled(Button)`
  height: fit-content;
`;

export const ButtonAction = styled(Button)`
  padding: 8px 12px;
  height: fit-content;

  aspect-ratio: 1 / 1;
  width: 46px;

  border-color: ${(props) => props?.theme?.colors?.secondaryDarker};

  svg {
    color: ${(props) => props?.theme?.colors?.secondaryDarker};
  }
`;

export const FilterActionWrap = styled.div``;

export const FilterAction = styled.div<{ $isRemove?: boolean }>`
  padding: 8px;
  cursor: pointer;
  border-radius: ${(props) => props?.theme?.radius?.smallRadius};

  gap: 6px;
  display: flex;
  align-items: center;

  ${({ $isRemove }) =>
    $isRemove &&
    css`
      p {
        color: ${(props) => props?.theme?.colors?.errorDark};
      }

      svg {
        color: ${(props) => props?.theme?.colors?.errorDark} !important;
      }
    `}

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.secondaryLight};
  }

  div {
    height: 24px;

    svg {
      color: ${(props) => props?.theme?.colors?.newtralLight};
    }
  }
`;

export const ContactContainerWrap = styled(Row)`
  height: calc(100vh - 220px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    height: 9px;
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    height: calc(100vh - 280px);
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    height: calc(100vh - 330px);
  }
`;

export const ImageUpload = styled.div<{ $isLoading?: boolean }>`
  position: relative;
  width: fit-content;

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      .ant-image-img {
        opacity: 0.5;
        pointer-events: none;
      }
    `};

  .ant-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    opacity: 1;
    z-index: 2;

    svg {
      color: ${(props) => props.theme.colors?.successDark};
    }
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    opacity: 1;
    z-index: 2;
  }
`;
