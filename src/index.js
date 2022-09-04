import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import store, { persistor } from "store";
import App from "./App";
import { history } from "helpers";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);
root.render(
  <HistoryRouter history={history}>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
            <App />
      </Provider>
    </PersistGate>
  </HistoryRouter>
);

reportWebVitals();
