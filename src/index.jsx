import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { setupI18n, getCountryCode } from "src/i18n";
import { store } from "src/store";

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
  window.dayjs = dayjs;
}

async function renderReactApp() {
  await setupI18n({ onCountryChange: () => renderReactApp() });

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={`
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button {  
                  opacity: 1;
                }
              `}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <App key={getCountryCode()} />
            </LocalizationProvider>
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
