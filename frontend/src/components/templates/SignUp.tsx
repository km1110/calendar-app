import { Dispatch, SetStateAction, useState } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";
import { signType } from "@/types/sign";

type Props = {
  signupData: signType;
  setSignupData: Dispatch<SetStateAction<signType>>;
  signup: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const SignUp = ({ signupData, setSignupData, signup }: Props) => {
  // const [signupData, setSignupData] = useState({
  //   email: "",
  //   password: "",
  // });

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
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            新規登録
          </Typography>
          <TextField
            value={signupData.email}
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
            value={signupData.password}
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
            登録
          </Button>
        </Box>
      </Box>
    </form>
  );
};
