import React, { useContext, useState } from "react";
import dayjs from "dayjs";

import { Header } from "@/components/parts/Header";
import { MonthContext } from "@/provider/CalendarProvider";
import { useNavigate } from "react-router-dom";
import { type } from "os";
import { DrawerWrapper } from "@/components/parts/DrawerWrapper";

type Props = {
  handleSignOut: () => void;
};

export const HeaderTemplate = ({ handleSignOut }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { month, setMonth } = useContext(MonthContext);

  const handlePrevioustMonth = () => {
    setMonth(month - 1);
  };

  const handleNextMonth = () => {
    setMonth(month + 1);
  };

  const year = dayjs().year();
  const date = dayjs(new Date(year, month));

  return (
    <div>
      <Header
        date={date}
        setPrevioustMonth={handlePrevioustMonth}
        setNextMonth={handleNextMonth}
        handleSignOut={handleSignOut}
        onClickMenu={() => setIsOpen(true)}
      />
      <DrawerWrapper isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
