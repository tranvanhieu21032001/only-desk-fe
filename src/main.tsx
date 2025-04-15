import { StrictMode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";

import { store } from "./store";
import { themes } from "./styles/themes";
import i18n from "./services/i18n/index.ts";
import GlobalStyle from "./styles/global/index.ts";

import App from "./App.tsx";

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
            <App />
          </I18nextProvider>
        </StrictMode>
      </ThemeProvider>
    </Provider>
  );
}

createRoot(document.getElementById("root")!).render(<Index />);
