import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import CssBaseline from "@material-ui/core/CssBaseline";
// import GlobalStyles from "@material-ui/core/GlobalStyles";
import { ThemeProvider } from "@material-ui/core/styles";

import { setupI18n, getCountryCode } from "src/i18n";
import { createStore } from "src/store";

import theme from "./theme";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV === "development") {
  window.sleep = ({ duration = 3000, reject: shouldReject = false } = {}) => {
    return new Promise((resolve, reject) =>
      setTimeout(
        shouldReject ? () => reject(new Error("Test reject")) : resolve,
        duration
      )
    );
  };
  window.theme = theme;
}

const store = createStore();

async function renderReactApp() {
  await setupI18n({ onCountryChange: () => renderReactApp() });

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <GlobalStyles
              styles={{
                "*::-webkit-scrollbar": {
                  display: "block"
                }
              }}
            /> */}
            <App key={getCountryCode()} />
          </ThemeProvider>
        </StoreProvider>
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
renderReactApp();

// reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
