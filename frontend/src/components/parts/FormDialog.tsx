import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import dayjs from "dayjs";
import { Grid } from "@mui/material";

type Props = {
  date: dayjs.Dayjs;
  handleOpne: any;
  handleClose: any;
};

const spacer = { margin: "4px 0" };

export const FormDialog = ({ date, handleOpne, handleClose }: Props) => {
  return (
    <div>
      <Dialog open={handleOpne} onClose={handleClose}>
        <DialogContent>
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
                <DatePicker value={date} format="YYYY/MM/DD" />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
