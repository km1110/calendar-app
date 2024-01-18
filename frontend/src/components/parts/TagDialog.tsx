import { tagType } from "@/types/tag";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";

type Props = {
  tag: tagType;
  typeDialog: "add" | "change";
  isOpen: boolean;
  onClose: () => void;
  handleCreate: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
};

export const TagDialog = ({
  tag,
  typeDialog,
  isOpen,
  onClose,
  handleCreate,
  handleChange,
  handleUpdate,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
      <DialogActions>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <Typography>タグ名</Typography>
        <TextField
          size="medium"
          defaultValue={tag ? tag.name : ""}
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
      </DialogContent>
      <DialogActions>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            onClick={() => {
              if (typeDialog === "add") {
                handleCreate();
              } else {
                handleUpdate();
              }
              onClose();
            }}
            size="small"
            variant="outlined"
            style={{
              borderColor: "black",
              background: "#69BD83",
            }}
            sx={{
              color: "white",
              width: "160px",
              fontSize: "20px",
            }}
          >
            {typeDialog === "add" ? "追加" : "更新"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
