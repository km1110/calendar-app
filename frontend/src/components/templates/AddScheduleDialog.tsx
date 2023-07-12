import { useState } from "react";
import { FormDialog } from "../parts/FormDialog";

export const AddScheduleDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpne = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FormDialog
        open={open}
        handleOpne={handleOpne}
        handleClose={handleClose}
      />
    </div>
  );
};
