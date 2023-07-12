import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import dayjs from "dayjs";

interface PropType {
  children: ReactNode;
}

interface monthProviderType {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
}

export const MonthContext = createContext<monthProviderType>(
  {} as monthProviderType
);

export const CalendarProvider = (props: PropType) => {
  const { children } = props;

  const currentMonth = dayjs().month();

  const [month, setMonth] = useState(currentMonth);

  return (
    <MonthContext.Provider value={{ month, setMonth }}>
      {children}
    </MonthContext.Provider>
  );
};
