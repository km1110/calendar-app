import { useContext, useState } from "react";
import { MonthContext } from "@/provider/CalendarProvider";

import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { jaJP } from "@mui/x-date-pickers/locales";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import "dayjs/locale/ja";

dayjs.extend(minMax);
dayjs.locale("ja");

class DateAdapter extends AdapterDateFns {
  getWeekdays = (): string[] => ["日", "月", "火", "水", "木", "金", "土"];
}

type Props = {
  handleSaveSchedule: () => Promise<void>;
};

export const AddScheduleBar = ({ handleSaveSchedule }: Props) => {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(today);
  const [title, setTitle] = useState("");
  const { daySelected, setDaySelected, schedule, setSchedule } =
    useContext(MonthContext);

  const isError = title === "" || daySelected === null;

  const theme = createTheme(
    {},
    jaJP // x-date-pickers translations
  );

  const onChangeDate = (date: Date | null) => {
    setSelectedDate(dayjs(date));
    setDaySelected(dayjs(date));
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setSchedule({ ...schedule, title: e.target.value });
  };

  const handleSave = () => {
    if (isError) return;
    handleSaveSchedule();
    setTitle("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="300px"
      marginTop="30px"
    >
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={DateAdapter}
          dateFormats={{ monthAndYear: "yyyy年 MM月", monthShort: "MM月" }}
        >
          <DateCalendar
            views={["day"]}
            value={selectedDate?.toDate()}
            onChange={onChangeDate}
            sx={{ width: "100%", transform: "scale(0.8)" }}
          />
        </LocalizationProvider>
      </ThemeProvider>
      <TextField
        size="small"
        inputProps={{ style: { fontSize: 18 } }}
        placeholder="予定"
        value={title}
        onChange={onChangeTitle}
      />
      <Button
        size="small"
        variant="outlined"
        style={{
          borderColor: "black",
          borderRadius: "20px",
          background: "#014A8F",
        }}
        sx={{
          color: "white",
          marginTop: "20px",
          width: "120px",
          fontSize: "20px",
        }}
        onClick={handleSave}
      >
        追加
      </Button>
    </Box>
  );
};
