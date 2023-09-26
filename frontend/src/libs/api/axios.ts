import React from "react";

import axios from "axios";
import { getAuth } from "firebase/auth";
import { app } from "@/libs/firebase";

export const makeIntance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8080",
  });
  // const user = useFirebaseUser();
  const auth = getAuth(app);
  instance.interceptors.request.use(async (request) => {
    const token = await auth.currentUser?.getIdToken();
    console.log(token);
    request.headers.common["Authorization"] = `bearer ${token}`;
    return request;
  });

  return instance;
};
