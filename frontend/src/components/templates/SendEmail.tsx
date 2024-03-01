import React from "react";
import { SendEmailForm } from "../parts/SendEmailForm";

export const SendEmail = () => {
  const [signinData, setSigninData] = React.useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
