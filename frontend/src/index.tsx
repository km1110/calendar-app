import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { RecoilRoot } from "recoil";

import App from "@/App";
import { CalendarProvider } from "@/provider/CalendarProvider";
import { FirebaseAuthProvider } from "./provider/FirebaseAuthProvider";

import "@/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAuthProvider>
        <RecoilRoot>
          <CalendarProvider>
            <App />
          </CalendarProvider>
        </RecoilRoot>
      </FirebaseAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
