import { useContext } from "react";

import { ChangeDialog } from "@/components/parts/ChangeDialog";
import { MonthContext } from "@/provider/CalendarProvider";

type Props = {
  handleChangeSchedule: any;
};

export const ChangeScheduleDialog = ({ handleChangeSchedule }: Props) => {
  const {
    schedule,
    daySelected,
    showChangeDialog,
    setSchedule,
    setShowChangeDialog,
  } = useContext(MonthContext);

  const handleClose = () => {
    setSchedule({
      id: "",
      title: "",
      date: daySelected,
      description: "",
      location: "",
    });
    setShowChangeDialog(false);
  };

  return (
    <div>
      <ChangeDialog
        schedule={schedule}
        showChangeDialog={showChangeDialog}
        setSchdule={setSchedule}
        handleClose={handleClose}
        handleChangeSchedule={handleChangeSchedule}
      />
    </div>
  );
};
