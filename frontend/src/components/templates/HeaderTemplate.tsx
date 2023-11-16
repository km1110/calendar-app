import { useContext, useState } from "react";
import dayjs from "dayjs";

import { Header } from "@/components/parts/Header";
import { MonthContext } from "@/provider/CalendarProvider";
import { DrawerWrapper } from "@/components/parts/DrawerWrapper";
import { useRecoilState } from "recoil";
import { pageState } from "@/atoms/pageState";

type Props = {
  handleGetSchedules: (displayMonth: dayjs.Dayjs) => void;
  handleSignOut: () => void;
};

export const HeaderTemplate = ({
  handleGetSchedules,
  handleSignOut,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useRecoilState<string>(pageState);
  const { month, setMonth } = useContext(MonthContext);

  const handlePrevioustMonth = () => {
    setMonth(month - 1);

    const year = dayjs().year();
    const date = dayjs(new Date(year, month - 1));

    handleGetSchedules(date);
  };

  const handleNextMonth = () => {
    setMonth(month + 1);

    const year = dayjs().year();
    const date = dayjs(new Date(year, month + 1));

    handleGetSchedules(date);
  };

  const year = dayjs().year();
  const date = dayjs(new Date(year, month));

  return (
    <div>
      <Header
        date={date}
        page={page}
        setPrevioustMonth={handlePrevioustMonth}
        setNextMonth={handleNextMonth}
        handleSignOut={handleSignOut}
        onClickMenu={() => setIsOpen(true)}
      />
      <DrawerWrapper
        setPage={setPage}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};
