import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { CalendarProvider } from "@/provider/CalendarProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CalendarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CalendarProvider>
  </React.StrictMode>
);
