import { StrictMode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { store } from './core/store/index.tsx';
import { themes } from './shared/styles/themes/index.ts';
import i18n from './core/services/i18n/index.ts';
import GlobalStyle from './shared/styles/global/index.ts';

import App from './App.tsx';
import { TitleProvider } from './core/context/TitleContext.tsx';

function Index() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    setIsDarkTheme(false);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkTheme ? themes?.darkTheme : themes.default}>
        <GlobalStyle />
        <StrictMode>
          <I18nextProvider i18n={i18n}>
            <TitleProvider>
              <App />
            </TitleProvider>
            <ToastContainer position="bottom-right" hideProgressBar={true} />
          </I18nextProvider>
        </StrictMode>
      </ThemeProvider>
    </Provider>
  );
}

createRoot(document.getElementById('root')!).render(<Index />);
