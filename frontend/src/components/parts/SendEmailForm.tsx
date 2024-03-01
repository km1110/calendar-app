import { Box, Card, Typography, TextField, Button } from "@mui/material";

type Props = {
  signinData: {
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const SendEmailForm = ({
  signinData,
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
                パスワード再設定
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
              <Typography
                sx={{ marginBottom: "20px" }}
                style={{
                  fontSize: "12px",
                  fontFamily: "Arial",
                  fontWeight: "inherit",
                }}
              >
                パスワード再設定用のURLを上記のメールアドレス宛に送信します
              </Typography>
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
                送信
              </Button>
            </Card>
          </Box>
        </Box>
      </form>
    </div>
  );
};
