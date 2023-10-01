import React from "react";

import axios from "axios";
import { getAuth } from "firebase/auth";
import { app } from "@/libs/firebase";

export const makeIntance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 2000,
  });
  // const user = useFirebaseUser();
  const auth = getAuth(app);
  instance.interceptors.request.use(async (request) => {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      request.headers.Authorization = `${token}`;
    } else {
      console.log("No token");
    }
    return request;
  });

  return instance;
};
