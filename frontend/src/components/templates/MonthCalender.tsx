import { useContext, useEffect, useState } from "react";

import { Box, Container, Grid } from "@mui/material";

import { MonthElement } from "@/components/templates/MonthElement";
import { createCalender } from "@/libs/service/calender";
import { MonthContext } from "@/provider/CalendarProvider";
import { margeSchedules } from "@/libs/service/schedule";
import { diaryType } from "@/types/diary";

type Props = {
  diarys: diaryType[];
};

export const MonthCalender = ({ diarys }: Props) => {
  const { month, schedules, setDaySelected, setShowAddDialog } =
    useContext(MonthContext);
  const [currentMonth, setCurrentMonth] = useState(createCalender());
  const [calendar, setCalendar] = useState(
    margeSchedules(currentMonth, schedules, diarys)
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const newCalendar = createCalender(month);
    setCurrentMonth(newCalendar);
    setCalendar(margeSchedules(newCalendar, schedules, diarys));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, schedules, diarys]);

  const days = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <Container sx={{ marginTop: "10px", width: "100%", height: "100%" }}>
      <Grid container columns={7}>
        {days.map((day) => (
          <Grid
            item
            display="flex"
            justifyContent="left"
            xs={1}
            key={day}
            sx={{
              borderBottom: "1px solid #ccc",
              fontWeight: "bold",
              color: "#666",
            }}
          >
            {day}
          </Grid>
        ))}
      </Grid>
      <Grid container columns={7}>
        {calendar.map((week: any, weekIndex: number) => (
          <Grid
            className="weeks"
            item
            xs={7}
            key={weekIndex}
            sx={{
              borderBottom: "1px solid #ccc;",
              textAlign: "right",
              height: "130px",
              position: "relative",
            }}
          >
            <Grid
              container
              columns={7}
              sx={{
                borderLeft: "1px solid #ccc",
                borderRight: "1px solid #ccc",
                position: "absolute",
              }}
            >
              {week.map((item: any, dayIndex: number) => (
                <Grid
                  item
                  xs={1}
                  key={parseInt(item.date.format("DD"))}
                  sx={{
                    borderBottom: "1px solid #ccc;",
                    textAlign: "right",
                    height: "130px",
                  }}
                ></Grid>
              ))}
            </Grid>
            <Grid container columns={7} sx={{ position: "absolute" }}>
              {week.map((item: any, dayIndex: number) => (
                <Grid
                  item
                  xs={1}
                  key={parseInt(item.date.format("DD"))}
                  sx={{
                    // textAlign: "left",
                    height: "130px",
                  }}
                >
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      setDaySelected(item.date);
                      setShowAddDialog(true);
                    }}
                    onMouseEnter={() => {
                      const d = parseInt(item.date.format("MMDD"));
                      setHoveredIndex(d);
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <MonthElement
                      key={parseInt(item.date.format("MMDD"))}
                      index={parseInt(item.date.format("MMDD"))}
                      hoveredIndex={hoveredIndex}
                      day={item.date}
                      schedules={item.schedules}
                      diary={item.diary}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
