import { HeaderTemplate } from "@/components/templates/HeaderTemplate";
import { MonthCalender } from "@/components/templates/MonthCalender";
import { AddScheduleDialog } from "@/components/templates/AddScheduleDialog";

export const MonthView = () => {
  return (
    <div>
      <HeaderTemplate />
      <MonthCalender />
      <AddScheduleDialog />
    </div>
  );
};
