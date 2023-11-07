import React, { useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { SignUp } from "@/components/templates/SignUp";
import { app } from "@/libs/firebase";
import { makeInstance } from "@/libs/api/axios";

export const SignUpView = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const auth = getAuth(app);

  const navigate = useNavigate();

  const instance = makeInstance();

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      );

      const body = {
        name: signupData.name,
        email: signupData.email,
      };
      await instance.post("/signup", body);

      // TODO signupDataを空にする
      navigate("/main");
    } catch (error) {
      console.log(error);
      alert("登録に失敗しました");
    }
  };

  return (
    <div>
      <SignUp
        signupData={signupData}
        setSignupData={setSignupData}
        signup={signup}
      />
    </div>
  );
};
