import React, { useEffect } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/libs/firebase";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactElement;
};

export const FirebaseAuthProvider = ({ children }: Props) => {
  const auth = getAuth(app);

  const noAuthPages = ["/", "/signup", "/signin"];
  const path = useLocation().pathname;
  const navigate = useNavigate();

  // 未認証状態で, 要認証ページにアクセスしたときはサインインページにリダイレクト
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user && !noAuthPages.includes(path)) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  });

  return <>{children}</>;
};
