import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { scheduleType } from "@/types/schedule";
import { DialogContentText, DialogTitle } from "@mui/material";

type Props = {
  schedule: scheduleType;
  showDialog: boolean;
  handleChange: any;
  handleDelete: any;
  handleClose: any;
};

export const CurrentDialog = ({
  schedule,
  showDialog,
  handleChange,
  handleDelete,
  handleClose,
}: Props) => {
  return (
    <div>
      <Dialog open={showDialog} onClose={handleClose}>
        <DialogActions>
          <IconButton onClick={handleChange}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogTitle>{schedule.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {schedule.date.format("MM月DD日")}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
