import { Header } from "@/components/parts/Header";
import { MonthCalender } from "@/components/templates/MonthCalender";

export const MonthView = () => {
  return (
    <div>
      <Header setPrevioustMonth={undefined} setNextMonth={undefined} />
      <MonthCalender />
    </div>
  );
};
