import { useContext } from "react";
import { FormDialog } from "../parts/FormDialog";
import { MonthContext } from "@/provider/CalendarProvider";

export const AddScheduleDialog = () => {
  const { daySelected, setShowDialog } = useContext(MonthContext);

  const handleOpne = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleSaveSchedule = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <FormDialog
        date={daySelected}
        handleOpne={handleOpne}
        handleClose={handleSaveSchedule}
      />
    </div>
  );
};
