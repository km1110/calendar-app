import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { CalendarProvider } from "@/provider/CalendarProvider";
import "@/index.css";
import { FirebaseAuthProvider } from "./provider/FirebaseAuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAuthProvider>
        <CalendarProvider>
          <App />
        </CalendarProvider>
      </FirebaseAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
