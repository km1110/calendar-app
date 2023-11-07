import { useContext } from "react";

import { ChangeDialog } from "@/components/parts/ChangeDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { scheduleType } from "@/types/schedule";

type Props = {
  handleChangeSchedule: (schedule: scheduleType) => Promise<void>;
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
