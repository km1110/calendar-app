import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";

type Props = {
  open: boolean;
  handleOpne: any;
  handleClose: any;
};

export const FormDialog = ({ open, handleOpne, handleClose }: Props) => {
  return (
    <div>
      <Dialog open={handleOpne} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="タイトル"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
