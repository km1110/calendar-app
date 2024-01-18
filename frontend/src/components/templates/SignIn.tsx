import React, { Dispatch, SetStateAction } from "react";

import { Box, Typography, TextField, Button, Card } from "@mui/material";

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
              backgroundColor: "#EBF4EF",
            }}
          >
            <Card
              sx={{
                width: { xs: "320px", sm: "420px" },
                height: { xs: "580px", sm: "540px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
                borderRadius: "15px",
              }}
            >
              <Typography
                variant="h5"
                sx={{ marginTop: "30px", marginBottom: "50px" }}
                style={{ fontFamily: "Arial", fontWeight: "bold" }}
              >
                ログイン
              </Typography>
              <TextField
                value={signinData.email}
                onChange={handleChange}
                required
                id="email"
                name="email"
                label="メールアドレス"
                variant="outlined"
                type="email"
                sx={{
                  width: { xs: "240px", sm: "360px" },
                  height: { xs: "25px", sm: "60px" },
                  marginBottom: { xs: "40px", sm: "10px" },
                }}
              />
              <TextField
                value={signinData.password}
                onChange={handleChange}
                required
                id="password"
                name="password"
                label="パスワード"
                variant="outlined"
                type="password"
                sx={{
                  width: { xs: "240px", sm: "360px" },
                  height: { xs: "30px", sm: "60px" },
                  marginBottom: { xs: "40px", sm: "10px" },
                }}
              />
              <Button
                size="small"
                variant="outlined"
                type="submit"
                style={{
                  background: "#69BD83",
                }}
                sx={{
                  color: "#ffffff",
                  marginTop: { xs: "10px", sm: "0px" },
                  marginX: "10px",
                  width: "160px",
                  fontSize: "20px",
                }}
              >
                ログイン
              </Button>
              <Typography
                sx={{ marginTop: "20px" }}
                style={{ fontFamily: "Arial", fontWeight: "bold" }}
              >
                <Link to={"/signup"}>新規登録</Link>
              </Typography>
            </Card>
          </Box>
        </Box>
      </form>
    </div>
  );
};
