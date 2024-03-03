import { Box, Card, Typography, TextField, Button } from "@mui/material";

type Props = {
  password1: string;
  password2: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const PasswordResetForm = ({
  password1,
  password2,
  handleChange,
  handleSubmit,
}: Props) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
                パスワードリセット
              </Typography>
              <TextField
                value={password1}
                onChange={handleChange}
                required
                id="password1"
                name="password1"
                label="新しいパスワード"
                variant="outlined"
                type="password"
                sx={{
                  width: { xs: "240px", sm: "360px" },
                  height: { xs: "30px", sm: "60px" },
                  marginBottom: { xs: "40px", sm: "10px" },
                }}
              />
              <TextField
                value={password2}
                onChange={handleChange}
                required
                id="password2"
                name="password2"
                label="新しいパスワードの確認"
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
                変更
              </Button>
            </Card>
          </Box>
        </Box>
      </form>
    </div>
  );
};
