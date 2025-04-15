import { css } from "styled-components";

const checkbox = css`
  .ant-checkbox-wrapper {
    color: ${({ theme }) => theme?.colors?.newtral};
    line-height: 1.35;
  }

  .ant-checkbox-wrapper .ant-checkbox {
    width: 18px;
    height: 18px;
  }

  .ant-table-thead .ant-checkbox-wrapper .ant-checkbox .ant-checkbox-inner {
    background-color: ${({ theme }) => theme?.colors?.newtral};
  }

  .ant-checkbox-disabled .ant-checkbox-inner:after {
    border-color: ${({ theme }) => theme?.colors?.primaryLight};
  }

  .ant-checkbox-wrapper .ant-checkbox .ant-checkbox-inner {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    font-weight: 500;
    color: ${({ theme }) => theme?.colors?.newtral};
  }

  .ant-checkbox-wrapper .ant-checkbox.ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover
    .ant-checkbox.ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner {
    background-color: ${({ theme }) => theme?.colors?.primary};
    border-color: ${({ theme }) => theme?.colors?.primary};

    &:hover {
      border: 1px solid red;
    }
  }

  .ant-checkbox-wrapper:hover .ant-checkbox .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled):after {
    border-color: ${({ theme }) => theme?.colors?.primary} !important;
  }

  .ant-checkbox-wrapper .ant-checkbox:after {
    border-color: ${({ theme }) => theme?.colors?.primary} !important;
  }

  .ant-checkbox-wrapper:active {
    color: ${({ theme }) => theme?.colors?.newtral};
  }
`;

const radioButton = css`
  .ant-radio-wrapper .ant-radio.ant-radio-checked .ant-radio-inner {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .ant-radio-wrapper:hover .ant-radio .ant-radio-inner {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const switchToggle = css``;

const select = css`
  .auth-lang {
    padding: 6px !important;

    .ant-select-item {
      padding: 6px;

      .ant-select-item-option-content {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }
`;

const input = css``;

const treeSelect = css`
  .head-office-tree {
    padding: 12px 0px !important;

    border-top: 1px solid ${({ theme }) => theme?.colors?.newtralLight};

    &:first-child {
      border-top: 0px;
    }

    .ant-select-tree-switcher {
      display: none;
    }
  }

  .branch-office-tree {
    margin-left: 40px;
    padding: 12px 0px !important;

    .ant-select-tree-switcher {
      display: none;
    }
  }

  .ant-select-dropdown {
    padding: 12px 16px;

    .ant-select-tree {
      .ant-select-tree-node-content-wrapper {
        padding: 5px 12px;
      }

      .ant-select-tree-treenode {
        margin-bottom: 0;
      }

      .ant-select-tree-switcher {
        display: none;
      }

      .ant-select-tree-treenode-checkbox-checked {
        .ant-select-tree-checkbox {
          .ant-select-tree-checkbox-inner {
            background-color: ${(props) => props?.theme?.colors?.primary};
            border-color: ${(props) =>
              props?.theme?.colors?.primary} !important;

            &:hover {
              background-color: ${(props) => props?.theme?.colors?.primary};
              border-color: ${(props) => props?.theme?.colors?.primary};
            }
          }
        }
      }

      .ant-select-tree-treenode-switcher-open {
        .ant-select-tree-checkbox {
          &:hover {
            .ant-select-tree-checkbox-inner {
              border-color: ${(props) => props?.theme?.colors?.primary};
            }
          }

          .ant-select-tree-checkbox-inner {
            border: 1.5px solid ${(props) => props?.theme?.colors?.newtralLight};

            &::after {
              background-color: ${(props) => props?.theme?.colors?.primary};
            }
          }
        }
      }

      .ant-select-tree-list-holder-inner {
        .ant-select-tree-title {
          font-weight: ${({ theme }) => theme?.fontWeight?.regular};
          font-size: ${({ theme }) => theme?.fontSize?.md};
          line-height: 24px;
          color: ${(props) => props?.theme?.colors?.newtral};
        }
      }
    }
  }

  .participants-select {
    .ant-select-tree-treenode {
      padding: 10px 0 !important;
    }
  }

  .ant-select-dropdown.participants-dropdown {
    .ant-select-tree-treenode {
      .ant-select-tree-checkbox {
        margin: 0px;
        align-self: center;
        margin-left: 4px;
      }

      .ant-select-tree-node-content-wrapper {
        padding: 8px 12px;
      }
    }
  }
`;

const utility = {
  checkbox,
  radioButton,
  select,
  switchToggle,
  input,
  treeSelect,
};

export { utility };
