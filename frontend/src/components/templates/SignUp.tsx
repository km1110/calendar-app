import { Dispatch, SetStateAction } from "react";

import { Box, Typography, TextField, Button, Card } from "@mui/material";
import { signupType } from "@/types/sign";
import { Link } from "react-router-dom";

type Props = {
  signupData: signupType;
  setSignupData: Dispatch<SetStateAction<signupType>>;
  signup: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const SignUp = ({ signupData, setSignupData, signup }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={signup}>
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
            backgroundColor: "#014A8F",
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
              アカウント登録
            </Typography>
            <TextField
              value={signupData.name}
              onChange={handleChange}
              required
              id="name"
              name="name"
              label="ニックネーム"
              variant="outlined"
              sx={{
                width: { xs: "240px", sm: "360px" },
                height: { xs: "25px", sm: "60px" },
                marginBottom: { xs: "40px", sm: "10px" },
              }}
            />
            <TextField
              value={signupData.email}
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
              value={signupData.password}
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
                borderColor: "black",
                background: "#014A8F",
                fontFamily: "Arial",
                fontWeight: "bold",
              }}
              sx={{
                color: "white",
                marginTop: { xs: "10px", sm: "0px" },
                marginX: "10px",
                width: "160px",
                fontSize: "20px",
              }}
            >
              登録
            </Button>
            <Typography
              sx={{ marginTop: "20px" }}
              style={{ fontFamily: "Arial", fontWeight: "bold" }}
            >
              <Link to={"/signin"}>ログイン</Link>
            </Typography>
          </Card>
        </Box>
      </Box>
    </form>
  );
};
