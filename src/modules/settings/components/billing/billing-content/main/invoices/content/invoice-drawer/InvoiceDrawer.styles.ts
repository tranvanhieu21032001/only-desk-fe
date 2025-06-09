// InvoiceDrawer.styles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalDrawerWrapperStyles = createGlobalStyle`
  .ant-drawer-content-wrapper {
    padding: 12px !important;
    box-shadow: unset !important;
  }

  .ant-drawer-content {
    border-radius: 16px;
  }

  .ant-drawer-header-title {
    flex-direction: row-reverse;
  }
`;
