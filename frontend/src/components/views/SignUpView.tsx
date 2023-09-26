import React, { useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { SignUp } from "@/components/templates/SignUp";
import { app } from "@/libs/firebase";

export const SignUpView = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth(app);

  const navigate = useNavigate();

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      );
      navigate("/calendar");
    } catch (error) {
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
