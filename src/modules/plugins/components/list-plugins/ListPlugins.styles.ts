import { Skeleton } from 'antd';

import { PluginsTypeEnums } from '../../helpers/enums/allPlugins';

import { css, styled } from 'styled-components';

export const PluginsContainer = styled.section`
  padding: 12px;
  height: 100%;
  border-radius: 0 8px 8px 0;

  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  @media ${(props) => props?.theme?.breakpoints?.xlMax} {
    margin-bottom: 12px;
  }
`;
export const PluginsTypesContainer = styled.div`
  margin-top: 12px;

  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const SkeletonContainer = styled(Skeleton.Button)``;

export const PluginType = styled.div<{ $type: PluginsTypeEnums }>`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};

  &:hover {
    animation: scaleUpDown 1s ease-in-out infinite;
  }

  @keyframes scaleUpDown {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  ${({ $type }) => {
    switch ($type) {
      case PluginsTypeEnums?.ESSENTIALS:
        return css`
          background-color: #e8f0fd;
          p,
          svg {
            color: ${(props) => props?.theme?.colors?.secondary};
          }
        `;
      case PluginsTypeEnums?.MINI:
        return css`
          background-color: #e4f9d2;
          p,
          svg {
            color: #389e0d;
          }
        `;
      case PluginsTypeEnums?.FREE:
        return css`
          background-color: #fce9f4;

          p,
          svg {
            color: #c41d7f;
          }
        `;
      case PluginsTypeEnums?.PLUS:
        return css`
          background-color: #fde9e7;

          p,
          svg {
            color: #d91f11;
          }
        `;
      default:
        return css`
          background-color: #f0e9fb;

          p,
          svg {
            color: #531dab;
          }
        `;
    }
  }}

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

export const Plugins = styled.div`
  margin-top: 7px;
  padding-top: 6px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  height: calc(100vh - 200px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    height: 9px;
  }

  @media ${(props) => props?.theme?.breakpoints?.xxxlMax} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    grid-template-columns: repeat(2, 1fr);
    height: calc(100vh - 300px);
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    height: calc(100vh - 350px);
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    grid-template-columns: repeat(1, 1fr);
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    height: calc(100vh - 400px);
  }
`;
