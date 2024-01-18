import {
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { projectsType } from "@/types/project";

type Props = {
  project: projectsType;
  typeDialog: "add" | "change";
  isOpen: boolean;
  onClose: () => void;
  handleCreate: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
};

export const ProjectDialog = ({
  project,
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
        <Typography>プロジェクト名</Typography>
        <TextField
          size="medium"
          defaultValue={project ? project.title : ""}
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
