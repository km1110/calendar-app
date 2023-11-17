import { Box, IconButton, Typography } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

import { Schedule } from "@/components/templates/Schedule";

import { useContext, useState } from "react";
import { MonthContext } from "@/provider/CalendarProvider";

type Props = {
  index: number;
  hoveredIndex: number | null;
  day: any;
  schedule: any;
};

export const MonthElement = ({ index, hoveredIndex, day, schedule }: Props) => {
  const { setShowDialog, setSchedule } = useContext(MonthContext);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "20%",
        }}
      >
        <Typography variant="caption" sx={{ marginBottom: "10px" }}>
          {hoveredIndex === index && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                console.log("clicked");
              }}
              sx={{ marginBottom: "10px" }}
            >
              <NoteAltIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          )}
        </Typography>
        <Typography variant="caption" sx={{ marginRight: "7px" }}>
          {day.format("D")}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", height: "80%", overflowY: "auto" }}>
        {schedule.map((e: any, index: number) => (
          <Schedule
            key={index}
            schedule={e}
            setSchedule={setSchedule}
            setShowDialog={setShowDialog}
          />
        ))}
      </Box>
    </Box>
  );
};
