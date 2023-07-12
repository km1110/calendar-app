import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import dayjs from "dayjs";

import { DateType } from "@/types/date";

interface PropType {
  children: ReactNode;
}

interface monthProviderType {
  date: DateType;
  setDate: Dispatch<SetStateAction<DateType>>;
}

export const MonthContext = createContext<monthProviderType>(
  {} as monthProviderType
);

export const CalendarProvider = (props: PropType) => {
  const { children } = props;

  const currentDate = dayjs();
  const year = currentDate.year();
  const month = currentDate.month() + 1;

  const [date, setDate] = useState<DateType>({ year, month });

  return (
    <MonthContext.Provider value={{ date, setDate }}>
      {children}
    </MonthContext.Provider>
  );
};
