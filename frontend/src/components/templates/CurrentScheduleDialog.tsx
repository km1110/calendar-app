import { useContext } from "react";

import { CurrentDialog } from "@/components/parts/CurrentDialog";
import { MonthContext } from "@/provider/CalendarProvider";

type Props = {
  handleDelete: any;
};

export const CurrentScheduleDialog = ({ handleDelete }: Props) => {
  const {
    daySelected,
    schedule,
    showDialog,
    setShowDialog,
    setShowChangeDialog,
    setSchedule,
  } = useContext(MonthContext);

  const handleClose = () => {
    setSchedule({
      id: "",
      title: "",
      date: daySelected,
      description: "",
      location: "",
    });
    setShowDialog(false);
  };

  return (
    <div>
      <CurrentDialog
        schedule={schedule}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        setShowChangeDialog={setShowChangeDialog}
        handleDelete={handleDelete}
        handleClose={handleClose}
      />
    </div>
  );
};
