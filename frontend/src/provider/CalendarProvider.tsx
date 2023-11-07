import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import dayjs from "dayjs";

import { scheduleType } from "@/types/schedule";

interface PropType {
  children: ReactNode;
}

interface monthProviderType {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  daySelected: dayjs.Dayjs;
  setDaySelected: Dispatch<SetStateAction<dayjs.Dayjs>>;
  // TODO 追加、表示、編集の３つが必要？？
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  showAddDialog: boolean;
  setShowAddDialog: Dispatch<SetStateAction<boolean>>;
  showChangeDialog: boolean;
  setShowChangeDialog: Dispatch<SetStateAction<boolean>>;
  schedule: scheduleType;
  setSchedule: Dispatch<SetStateAction<scheduleType>>;
  schedules: scheduleType[];
  setSchedules: Dispatch<SetStateAction<scheduleType[]>>;
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
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showChangeDialog, setShowChangeDialog] = useState(false);
  const [schedules, setSchedules] = useState<scheduleType[]>([]);
  const [schedule, setSchedule] = useState<scheduleType>({
    id: "",
    title: "",
    description: "",
    date: daySelected,
    location: "",
  });

  return (
    <MonthContext.Provider
      value={{
        month,
        setMonth,
        daySelected,
        setDaySelected,
        showDialog,
        setShowDialog,
        showAddDialog,
        setShowAddDialog,
        showChangeDialog,
        setShowChangeDialog,
        schedule,
        setSchedule,
        schedules,
        setSchedules,
      }}
    >
      {children}
    </MonthContext.Provider>
  );
};
