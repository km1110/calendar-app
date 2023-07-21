import { useContext, useEffect, useState } from "react";

import { Container, Grid } from "@mui/material";

import { MonthElement } from "@/components/templates/CalenderElement/MonthElement";
import { createCalender } from "@/libs/service/calender";
import { MonthContext } from "@/provider/CalendarProvider";
import { setSchedules } from "@/libs/service/schedule";
import dayjs from "dayjs";

export const MonthCalender = () => {
  const [currentMonth, setCurrentMonth] = useState(createCalender());

  const { month, schedules, setDaySelected, setShowDialog } =
    useContext(MonthContext);

  useEffect(() => {
    const calendar = setSchedules(createCalender(month), schedules);
    setCurrentMonth(createCalender(month));
  }, [month, schedules]);

  const days = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div>
      <Container sx={{ marginTop: "10px" }}>
        <Grid container columns={{ xs: 7, sm: 7, md: 7 }}>
          {days.map((day) => (
            <Grid
              item
              xs={1}
              sm={1}
              md={1}
              key={day}
              sx={{
                borderBottom: "1px solid #ccc",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {day}
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          columns={{ xs: 7, sm: 7, md: 7 }}
          sx={{ borderLeft: "1px solid #ccc" }}
        >
          {currentMonth.map((day: any, i: number) => (
            <Grid
              item
              xs={1}
              sm={1}
              md={1}
              key={i}
              sx={{
                borderRight: "1px solid #ccc",
                borderBottom: "1px solid #ccc;",
                textAlign: "right",
                width: "40px",
                height: "100px",
              }}
            >
              <div
                onClick={() => {
                  setDaySelected(day);
                  setShowDialog(true);
                }}
              >
                <MonthElement key={i} day={day} />
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
