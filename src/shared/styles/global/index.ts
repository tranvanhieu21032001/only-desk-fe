import { createGlobalStyle, css } from 'styled-components';

import { utility } from './utility';

const calculateLetterSpacing = (fontSize: string, percent: number = 0.02) => {
  const fontSizeNumber = parseFloat(fontSize);
  return `${fontSizeNumber * percent}px`;
};

const reset = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }

  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: inherit;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  textarea,
  input {
    outline: none !important;
    appearance: none;
    -webkit-appearance: none;
    box-shadow: none !important;
  }

  html {
    visibility: visible;
    opacity: 1;
  }

  .container {
    max-width: 1440px;
  }

  .box-container {
    padding: 0 36px 36px;

    @media ${(props) => props?.theme?.breakpoints?.xlMax} {
      padding: 24px;
    }

    @media ${(props) => props?.theme?.breakpoints?.lgMax} {
      padding: 16px;
    }
  }

  .modal-confirm-export-database {
    .ant-modal-close {
      display: none;
    }
  }

  .modal-preview-image {
    .ant-modal-header {
      text-align: center;
    }

    .ant-btn {
      padding: 10px 26px !important;
      height: unset !important;
    }

    .ant-modal-footer {
      text-align: center;

      .ant-btn-primary {
        background-color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};

        &:hover {
          box-shadow: 0px 11px 27px 0px #00000040;
          transition: all 0.5s;
          background-color: ${(props) => props.theme.colors.primaryDark};
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      }

      .ant-btn-default {
        background-color: ${(props) => props.theme.colors.newtralLightest};
        border: 1px solid ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.primary};

        &:hover {
          border: 1px solid ${(props) => props.theme.colors.primary};
          box-shadow: 0px 11px 27px 0px #00000040;
          transition: all 0.5s;
          color: ${(props) => props.theme.colors.primary};
        }
      }
    }
  }

  .ant-menu-inline-collapsed-tooltip {
    .ant-tooltip-arrow {
      display: none;
    }
    .ant-tooltip-content .ant-tooltip-inner {
      background-color: #fff;
      padding: 16px !important;
    }
  }

  .popover-table-common {
    width: fit-content !important;

    .ant-popover-title {
      min-width: fit-content;
      margin: 0;
    }
  }

  .center-column-auth {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 250px);
    padding: 70px 0 !important;

    @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
      min-height: calc(100vh - 80px);
    }

    @media ${(props) => props?.theme?.breakpoints?.xlMax} {
      min-height: calc(100vh - 70px);
    }

    @media ${(props) => props?.theme?.breakpoints?.lgMax} {
      padding: 50px 0 !important;
      min-height: calc(100vh - 60px);
    }

    @media ${(props) => props?.theme?.breakpoints?.mdMax} {
      padding: 40px 0 !important;
      min-height: calc(100vh - 50px);
    }

    @media ${(props) => props?.theme?.breakpoints?.smMax} {
      min-height: calc(100vh -30px);
    }
  }

  .center-column-forgot {
    min-height: calc(100vh - 120px);
  }
`;

const typography = css`
  h1 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.xxxl};
    line-height: 52px;
    letter-spacing: ${({ theme }) =>
      calculateLetterSpacing(theme.fontSize.xxxl)};
  }

  h2 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.xxl};
    line-height: 44px;
    letter-spacing: ${({ theme }) =>
      calculateLetterSpacing(theme.fontSize.xxl)};
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.xl};
    line-height: 28px;
    letter-spacing: ${({ theme }) => calculateLetterSpacing(theme.fontSize.xl)};
  }

  h4 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.md};
    line-height: 24px;
    letter-spacing: ${({ theme }) => calculateLetterSpacing(theme.fontSize.xl)};
  }

  h5 {
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.fontSize.lg};
    line-height: 28px;
    letter-spacing: ${({ theme }) =>
      calculateLetterSpacing(theme.fontSize.lg, 0)};
  }

  .body-text-larger {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.lg};
    line-height: 26px;
    letter-spacing: ${({ theme }) =>
      calculateLetterSpacing(theme.fontSize.lg, 0)};
  }

  .body-text-normal {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.md};
    line-height: 23px;
    letter-spacing: ${({ theme }) =>
      calculateLetterSpacing(theme.fontSize.md, 0)};
  }

  .body-text-small {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 20px;
    letter-spacing: ${({ theme }) =>
      calculateLetterSpacing(theme.fontSize.base, 0)};
  }

  .caption-normal {
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.fontSize.md};
    line-height: 24px;
    letter-spacing: ${({ theme }) =>
      calculateLetterSpacing(theme.fontSize.md, 0.02)};
  }

  .caption-small {
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: 20px;
    letter-spacing: ${({ theme }) =>
      calculateLetterSpacing(theme.fontSize.base, 0.02)};
  }
`;

const scrollApp = css`
  ::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #a0a0a5;
    border-radius: 16px;
    z-index: 1000;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }
`;

const popOver = css`
  .workspaces-popover {
    width: 270px;
    inset: 17px 0px 0px 60px !important;

    .ant-popover-arrow {
      display: none;
    }

    .ant-popover-inner {
      padding: 24px 12px;
    }
  }

  .settings-popover {
    width: 270px;
    inset-inline-start: 60px !important;

    .ant-popover-arrow {
      display: none;
    }

    .ant-popover-inner {
      padding: 24px 12px;
    }
  }

  .profile-popover {
    width: 270px;
    inset-inline-start: 60px !important;

    .ant-popover-arrow {
      display: none;
    }

    .ant-popover-inner {
      padding: 24px 12px;
    }
  }

  .menu-popover {
    width: 100%;
    max-width: 240px;
    inset-inline-start: 60px !important;

    .ant-popover-arrow {
      display: none;
    }

    .ant-popover-inner {
      padding: 24px 12px;
    }
  }

  .notification-popover {
    width: 100%;
    max-width: 420px;
    inset: 77px auto auto 505px !important;

    .ant-popover-arrow {
      display: none;
    }

    .ant-popover-inner {
      border-radius: 0 0 8px 8px;
      padding: 0px;
    }
  }

  .menu-no-children-popover {
    width: fit-content;
    inset-inline-start: 60px !important;

    .ant-popover-arrow {
      display: none;
    }

    .ant-popover-inner {
      padding: 12px;
    }
  }

  .search-header {
    width: 100% !important;
    max-width: 70% !important;
    top: 76px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;

    .ant-popover-arrow {
      display: none;
    }

    .ant-popover-inner {
      padding: 12px;

      border-radius: 0px 0px ${(props) => props?.theme?.radius?.normalRadius}
        ${(props) => props?.theme?.radius?.normalRadius};
    }

    @media ${(props) => props?.theme?.breakpoints?.xlMax} {
      max-width: 80% !important;
    }

    @media ${(props) => props?.theme?.breakpoints?.lgMax} {
      max-width: calc(100% - 140px) !important;
    }

    @media ${(props) => props?.theme?.breakpoints?.smMax} {
      max-width: 100% !important;
    }
  }

  .popover-action {
    .ant-popover-arrow {
      display: none;
    }

    .ant-popover-inner {
      padding: 12px;
      border-radius: 0px;
    }
  }

  .drawer-contact-add-filter {
    .ant-drawer-content-wrapper {
      height: 95%;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);

      border-radius: ${(props) => props?.theme?.radius?.mediumRadius};
      max-width: 400px;

      .ant-drawer-content {
        border-radius: ${(props) => props?.theme?.radius?.mediumRadius};
      }

      @media ${(props) => props?.theme?.breakpoints?.smMax} {
        max-width: 296px !important;
      }
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${typography}
  ${utility.checkbox}
  ${utility.radioButton}
  ${utility.select}
  ${utility.switchToggle}
  ${utility.input}
  ${utility.treeSelect}
  ${scrollApp}
  ${popOver}
`;

export default GlobalStyle;
