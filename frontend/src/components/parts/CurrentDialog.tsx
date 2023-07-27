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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotesIcon from "@mui/icons-material/Notes";

import { scheduleType } from "@/types/schedule";
import { DialogContentText, DialogTitle } from "@mui/material";

import dayjs from "dayjs";

type Props = {
  schedule: scheduleType;
  showDialog: any;
  setShowDialog: any;
  setShowChangeDialog: any;
  handleChange: any;
  handleDelete: any;
  handleClose: any;
};

export const CurrentDialog = ({
  schedule,
  showDialog,
  setShowDialog,
  setShowChangeDialog,
  handleChange,
  handleDelete,
  handleClose,
}: Props) => {
  return (
    <div>
      <Dialog open={showDialog} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogActions>
          <IconButton
            onClick={(e) => {
              setShowDialog(false);
              setShowChangeDialog(true);
              // handleChange(schedule);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(schedule.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogTitle>{schedule.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dayjs(schedule.date).format("MM/DD")}
          </DialogContentText>
          <Grid
            container
            spacing={1}
            sx={{ alignItems: "center", justifyItems: "space-between" }}
          >
            <Grid item>
              <LocationOnIcon />
            </Grid>
            <Grid item xs={10}>
              <DialogContentText>{schedule.location}</DialogContentText>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{ alignItems: "center", justifyItems: "space-between" }}
          >
            <Grid item>
              <NotesIcon />
            </Grid>
            <Grid item xs={10}>
              <DialogContentText>{schedule.description}</DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
