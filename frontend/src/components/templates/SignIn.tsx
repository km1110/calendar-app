import React, { Dispatch, SetStateAction } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";

import { signinType } from "@/types/sign";
import { Link } from "react-router-dom";

type Props = {
  signinData: signinType;
  setSigninData: Dispatch<SetStateAction<signinType>>;
  signin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const SignIn = ({ signinData, setSigninData, signin }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={signin}>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              ログイン画面
            </Typography>
            <TextField
              value={signinData.email}
              onChange={handleChange}
              required
              size="small"
              id="email"
              name="email"
              label="メールアドレス"
              variant="outlined"
              type="email"
              sx={{
                width: { xs: "240px", sm: "360px" },
                marginBottom: "20px",
              }}
            />
            <TextField
              value={signinData.password}
              onChange={handleChange}
              required
              size="small"
              id="password"
              name="password"
              label="パスワード"
              variant="outlined"
              type="password"
              sx={{
                width: { xs: "240px", sm: "360px" },

                marginBottom: "20px",
              }}
            />
            <Button
              size="small"
              variant="outlined"
              type="submit"
              style={{
                borderColor: "black",
                background: "#014A8F",
              }}
              sx={{
                color: "white",
                marginTop: { xs: "10px", sm: "0px" },
                marginX: "10px",
                width: "160px",
                fontSize: "20px",
              }}
            >
              ログイン
            </Button>
            <Typography sx={{ marginTop: "20px" }}>
              <Link to={"/signup"}>新規登録</Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </div>
  );
};
