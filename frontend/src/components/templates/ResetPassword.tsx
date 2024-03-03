import { useEffect, useState } from "react";

import { confirmPasswordReset, getAuth } from "firebase/auth";

import { PasswordResetForm } from "@/components/parts/PasswordResetForm";
import { app } from "@/libs/firebase";

export const ResetPassword = () => {
  const [actionCode, setActionCode] = useState("");

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const auth = getAuth(app);

  // 初回のレンダリングのみ
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const oobCode = queryParams.get("oobCode") || "";
    setActionCode(oobCode);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password1") {
      setPassword1(value);
    } else {
      setPassword2(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (actionCode === "") return;

    if (password1 !== password2) {
      alert("パスワードが一致しません");
      return;
    }
    try {
      confirmPasswordReset(auth, actionCode, password1);
      alert("パスワードをリセットしました");
    } catch (error) {
      alert("パスワードのリセットに失敗しました");
    }

    // フォームをクリア
    setPassword1("");
    setPassword2("");

    // ログインページに遷移
    window.location.href = "/login";
  };

  return (
    <div>
      <PasswordResetForm
        password1={password1}
        password2={password2}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
