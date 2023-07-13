import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import dayjs from "dayjs";

import { schedule } from "@/types/schedule";

interface PropType {
  children: ReactNode;
}

interface monthProviderType {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  daySelected: dayjs.Dayjs;
  setDaySelected: Dispatch<SetStateAction<dayjs.Dayjs>>;
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  schedules: schedule[];
  setSchedules: Dispatch<SetStateAction<schedule[]>>;
}

export const MonthContext = createContext<monthProviderType>(
  {} as monthProviderType
);

export const CalendarProvider = (props: PropType) => {
  const { children } = props;

  const today = dayjs();
  const currentMonth = today.month();

  const [month, setMonth] = useState(currentMonth);
  const [daySelected, setDaySelected] = useState(today);
  const [showDialog, setShowDialog] = useState(false);
  const [schedules, setSchedules] = useState<schedule[]>([]);

  return (
    <MonthContext.Provider
      value={{
        month,
        setMonth,
        daySelected,
        setDaySelected,
        showDialog,
        setShowDialog,
        schedules,
        setSchedules,
      }}
    >
      {children}
    </MonthContext.Provider>
  );
};
