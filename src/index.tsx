import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { YMaps } from "@pbe/react-yandex-maps";
import { SnackbarProvider } from "notistack";

export const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <YMaps
    query={{
      apikey: "abf6f29e-7805-4c21-9d41-fd91bfd35987",
      load: "package.full",
    }}
    preload={true}>
    <Provider store={store}>
      <SnackbarProvider maxSnack={4}>
        <App />
      </SnackbarProvider>
    </Provider>
  </YMaps>,
);
