import { Dispatch, SetStateAction, useState } from "react";
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
import { scheduleType } from "@/types/schedule";

dayjs.extend(minMax);
dayjs.locale("ja");

class DateAdapter extends AdapterDateFns {
  getWeekdays = (): string[] => ["日", "月", "火", "水", "木", "金", "土"];
}

type Props = {
  schedule: scheduleType;
  setSchdule: Dispatch<SetStateAction<scheduleType>>;
  handleSaveSchedule: () => Promise<void>;
};

export const AddScheduleBar = ({
  schedule,
  setSchdule,
  handleSaveSchedule,
}: Props) => {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(today);

  const theme = createTheme(
    {},
    jaJP // x-date-pickers translations
  );

  const onChange = (date: Date | null) => {
    setSelectedDate(dayjs(date));
    setSchdule({ ...schedule, date: dayjs(date) });
  };

  return (
    <form onSubmit={handleSaveSchedule}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="320px"
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
              maxDate={today.toDate()}
              onChange={onChange}
              sx={{ width: "100%", transform: "scale(0.8)" }}
            />
          </LocalizationProvider>
        </ThemeProvider>
        <TextField
          size="small"
          inputProps={{ style: { fontSize: 18 } }}
          placeholder="予定"
          value={schedule.title}
          onChange={(e) => setSchdule({ ...schedule, title: e.target.value })}
        />
        <Button
          size="small"
          variant="outlined"
          type="submit"
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
        >
          追加
        </Button>
      </Box>
    </form>
  );
};
