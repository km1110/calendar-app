import { useContext } from "react";
import { FormDialog } from "../parts/FormDialog";
import { MonthContext } from "@/provider/CalendarProvider";

export const AddScheduleDialog = () => {
  // const [open, setOpen] = useState(false);
  const { showDialog, setShowDialog } = useContext(MonthContext);

  const handleOpne = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <FormDialog
        open={showDialog}
        handleOpne={handleOpne}
        handleClose={handleClose}
      />
    </div>
  );
};
