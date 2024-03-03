import React from "react";
import { SendEmailForm } from "../parts/SendEmailForm";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "@/libs/firebase";

export const SendEmail = () => {
  const [signinData, setSigninData] = React.useState({
    email: "",
  });

  const auth = getAuth(app);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, signinData.email)
      .then(() => {
        alert("メールを送信しました");
      })
      .catch((error) => {
        alert("メールの送信に失敗しました");
      });
  };

  return (
    <div>
      <SendEmailForm
        signinData={signinData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
