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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import CloseIcon from "@mui/icons-material/Close";
import { todoType } from "@/types/todo";
import { currencies } from "@/mock/tag";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedItem: todoType | null;
};

export const AddTodoDialog = ({
  isOpen,
  onClose,
  handleChange,
  selectedItem,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
      <DialogActions>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <Typography>タスク名</Typography>
        <TextField
          size="medium"
          defaultValue={selectedItem ? selectedItem.name : ""}
          id="name"
          name="name"
          variant="outlined"
          type="text"
          sx={{
            width: { xs: "200px", sm: "360px" },
            background: "white",
            marginBottom: { xs: "20px" },
          }}
          onChange={handleChange}
        />
        <Typography>カテゴリー</Typography>
        <TextField
          select
          size="medium"
          defaultValue={selectedItem ? selectedItem.tag : ""}
          id="tag"
          name="tag"
          variant="outlined"
          sx={{ width: { xs: "200px", sm: "360px" }, marginBottom: "20px" }}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography>日付</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TextField
            size="medium"
            defaultValue={selectedItem ? selectedItem.date : ""}
            id="date"
            name="date"
            variant="outlined"
            type="date"
            sx={{
              width: { xs: "200px", sm: "360px" },
              background: "white",
              marginBottom: { xs: "20px" },
            }}
            onChange={handleChange}
          />
        </LocalizationProvider>
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
