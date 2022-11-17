import React from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";

import App from "./App";

const rootElement = document.getElementById("root66");
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  // </React.StrictMode>
);
