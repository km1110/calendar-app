import { useContext, useEffect, useState } from "react";

import { Box, Container, Grid } from "@mui/material";

import { MonthElement } from "@/components/templates/MonthElement";
import { createCalender } from "@/libs/service/calender";
import { MonthContext } from "@/provider/CalendarProvider";
import { margeSchedules } from "@/libs/service/schedule";

export const MonthCalender = () => {
  const { month, schedules, setDaySelected, setShowAddDialog } =
    useContext(MonthContext);
  const [currentMonth, setCurrentMonth] = useState(createCalender());
  const [calendar, setCalendar] = useState(
    margeSchedules(currentMonth, schedules)
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const newCalendar = createCalender(month);
    setCurrentMonth(newCalendar);
    setCalendar(margeSchedules(newCalendar, schedules));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, schedules]);

  const days = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div>
      <Container sx={{ marginTop: "10px", width: "100%", height: "100%" }}>
        <Grid container columns={7}>
          {days.map((day) => (
            <Grid
              item
              xs={1}
              key={day}
              sx={{
                borderBottom: "1px solid #ccc",
                textAlign: "center",
                fontWeight: "bold",
                color: "#666",
              }}
            >
              {day}
            </Grid>
          ))}
        </Grid>
        <Grid container columns={7} sx={{ borderLeft: "1px solid #ccc" }}>
          {calendar.map((item: any, index: number) => (
            <Grid
              className="hoge1"
              item
              xs={1}
              key={index}
              sx={{
                borderRight: "1px solid #ccc",
                borderBottom: "1px solid #ccc;",
                textAlign: "right",
                height: "130px",
              }}
            >
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  setDaySelected(item.date);
                  setShowAddDialog(true);
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{ width: "100%", height: "100%" }}
              >
                <MonthElement
                  key={index}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  day={item.date}
                  schedule={item.schedules}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
