import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { HistoryProvider } from "./context/HistoryContext";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HistoryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HistoryProvider>
  </React.StrictMode>
);
