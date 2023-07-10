import { useState } from "react";

import dayjs from "dayjs";
import { Container, Grid, Typography } from "@mui/material";

import { MonthElement } from "@/components/templates/CalenderElement/MonthElement";
import { createCalender } from "@/libs/service/calender";

export const MonthCalender = () => {
  const currentDate = dayjs();
  const year = currentDate.year();
  const month = currentDate.month() + 1;

  const [currentMonth, setCurrentMonth] = useState(
    createCalender({ year, month })
  );

  const days = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div>
      <Container>
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
          {currentMonth.map((days: any, i: number) => (
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
              <Typography>
                <MonthElement key={i} day={days} />
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
