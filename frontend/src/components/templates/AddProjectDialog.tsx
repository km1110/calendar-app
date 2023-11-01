import {
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
  Typography,
  TextField,
  Box,
  Button,
  MenuItem,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AddProjectDialog = ({ isOpen, onClose, handleChange }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
      <DialogActions>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <Typography>プロジェクト名</Typography>
        <TextField
          size="medium"
          defaultValue=""
          id="title"
          name="title"
          variant="outlined"
          type="text"
          sx={{
            width: { xs: "200px", sm: "360px" },
            background: "white",
            marginBottom: { xs: "20px" },
          }}
          onChange={handleChange}
        />
        <Typography>概要</Typography>
        <TextField
          size="medium"
          defaultValue=""
          id="description"
          name="description"
          variant="outlined"
          type="text"
          sx={{
            width: { xs: "200px", sm: "360px" },
            background: "white",
            marginBottom: { xs: "20px" },
          }}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            onClick={() => {
              // onSubmit();
              onClose();
            }}
            size="small"
            variant="outlined"
            style={{
              borderColor: "black",
              background: "#014A8F",
            }}
            sx={{
              color: "white",
              width: "160px",
              fontSize: "20px",
            }}
          >
            追加
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
