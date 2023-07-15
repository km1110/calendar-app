import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotesIcon from "@mui/icons-material/Notes";

import dayjs from "dayjs";

type Props = {
  date: dayjs.Dayjs;
  handleOpne: any;
  handleClose: any;
};

const spacer = { margin: "10px 0" };

export const FormDialog = ({ date, handleOpne, handleClose }: Props) => {
  return (
    <div>
      <Dialog open={handleOpne} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogActions>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <TextField
            size="medium"
            inputProps={{ style: { fontSize: 22 } }}
            variant="standard"
            fullWidth
            placeholder="タイトルを追加"
            sx={{ marginBottom: 4 }}
          />
          <Grid
            container
            spacing={1}
            sx={{ alignItems: "center", justifyItems: "space-between" }}
          >
            <Grid item>
              <AccessTimeIcon />
            </Grid>
            <Grid item xs={10}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={date} format="YYYY/MM/DD" className="" />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{ alignItems: "center", justifyItems: "space-between" }}
          >
            <Grid item>
              <LocationOnIcon />
            </Grid>
            <Grid item xs={10}>
              <TextField
                style={spacer}
                variant="standard"
                fullWidth
                placeholder="場所を追加"
              />
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
              <TextField
                style={spacer}
                variant="standard"
                fullWidth
                placeholder="説明を追加"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>保存</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
