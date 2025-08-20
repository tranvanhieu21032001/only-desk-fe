import { StrictMode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { RelayEnvironmentProvider } from 'react-relay';

import { store } from './core/store/index.tsx';
import { themes } from './shared/styles/themes/index.ts';
import i18n from './core/services/i18n/index.ts';
import GlobalStyle from './shared/styles/global/index.ts';

import App from './App.tsx';
import { TitleProvider } from './core/context/TitleContext.tsx';
import environment from './relay/RelayEnvironment.ts';
import { PermissionProvider } from './modules/permissions/contexts/PermissionContext';

function Index() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    setIsDarkTheme(false);
  }, []);

  return (
    <Provider store={store}>
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider theme={isDarkTheme ? themes?.darkTheme : themes.default}>
          <GlobalStyle />
          <StrictMode>
            <I18nextProvider i18n={i18n}>
              <TitleProvider>
                <PermissionProvider>
                  <App />
                </PermissionProvider>
              </TitleProvider>
              <ToastContainer position="bottom-right" hideProgressBar={true} />
            </I18nextProvider>
          </StrictMode>
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </Provider>
  );
}

createRoot(document.getElementById('root')!).render(<Index />);
