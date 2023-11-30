import { useContext, useState } from "react";

import { Box, IconButton, Typography } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";

import { Schedule } from "@/components/templates/Schedule";
import { Diary } from "@/components/templates/Diary";
import { scheduleType } from "@/types/schedule";

import { MonthContext } from "@/provider/CalendarProvider";
import { diaryType } from "@/types/diary";
import { diaryState } from "@/atoms/diaryState";

type Props = {
  index: number;
  hoveredIndex: number | null;
  day: dayjs.Dayjs;
  schedules: scheduleType[];
  diary: diaryType;
};

export const MonthElement = ({
  index,
  hoveredIndex,
  day,
  schedules,
  diary,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setShowDialog, setSchedule } = useContext(MonthContext);
  const [currentDiary, setCurrentDiary] = useRecoilState<diaryType>(diaryState);

  const handleClose = () => {
    setIsOpen(false);
  };

  const initDiary = {
    id: "",
    title: "",
    content: "",
    date: day,
  };

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
                if (!diary) {
                  setCurrentDiary(initDiary);
                } else {
                  setCurrentDiary(diary);
                }
                setIsOpen(true);
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
        {schedules.map((schedule: scheduleType, index: number) => (
          <Schedule
            key={index}
            schedule={schedule}
            setSchedule={setSchedule}
            setShowDialog={setShowDialog}
          />
        ))}
      </Box>
      <Diary
        day={day}
        diary={currentDiary}
        setDiary={setCurrentDiary}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </Box>
  );
};
