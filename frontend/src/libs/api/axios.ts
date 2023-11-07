import axios from "axios";
import { getAuth } from "firebase/auth";
import { app } from "@/libs/firebase";
import { redirect } from "react-router-dom";

export const makeInstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 20000,
  });

  const auth = getAuth(app);

  const waitForAuth = new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    }, reject);
  });

  instance.interceptors.request.use(async (request) => {
    await waitForAuth;
    if (auth.currentUser) {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("No token");
      }
    } else {
      console.log("No user");
      redirect("/login");
      return request;
    }
    return request;
  });

  return instance;
};
