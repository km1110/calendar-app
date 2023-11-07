import { useContext } from "react";

import { FormDialog } from "../parts/FormDialog";
import { MonthContext } from "@/provider/CalendarProvider";

type Props = {
  handleSaveSchedule: any;
};

export const AddScheduleDialog = ({ handleSaveSchedule }: Props) => {
  const {
    schedule,
    daySelected,
    showAddDialog,
    setSchedule,
    setShowAddDialog,
  } = useContext(MonthContext);

  const handleClose = () => {
    setSchedule({
      id: "",
      title: "",
      date: daySelected,
      description: "",
      location: "",
    });
    setShowAddDialog(false);
  };

  return (
    <div>
      <FormDialog
        schedule={schedule}
        date={daySelected}
        setSchdule={setSchedule}
        showAddDialog={showAddDialog}
        handleClose={handleClose}
        handleSaveSchedule={handleSaveSchedule}
      />
    </div>
  );
};
