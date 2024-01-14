import { useContext, useState } from "react";

import { Box, Card, IconButton, Typography, styled } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";

import { Schedule } from "@/components/templates/Schedule";
import { DiaryDialog } from "@/components/templates/DiaryDialog";
import { scheduleType } from "@/types/schedule";

import { MonthContext } from "@/provider/CalendarProvider";
import { diaryType } from "@/types/diary";
import { diaryState } from "@/atoms/diaryState";
import { DailyDialog } from "../parts/DailyDialog";

type Props = {
  index: number;
  hoveredIndex: number | null;
  day: dayjs.Dayjs;
  schedules: scheduleType[];
  diary: diaryType;
};

const ScheduleStyle = styled(Card)(({ theme }) => ({
  marginBottom: "4px",
  borderRadius: "5px",
  height: "22px",
  background: "#fff",
}));

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

  const [showDailyDialog, setShowDailyDialog] = useState<boolean>(false);

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
      <Box
        sx={{
          textAlign: "center",
          marginLeft: "2.5px",
          width: "95%",
          height: "80%",
        }}
      >
        {schedules.slice(0, 3).map((schedule: scheduleType, index: number) => (
          <Schedule
            key={index}
            schedule={schedule}
            setSchedule={setSchedule}
            setShowDialog={setShowDialog}
          />
        ))}
        {schedules.length > 3 && (
          <ScheduleStyle>
            <Box
              onClick={(e) => {
                e.stopPropagation();
                setShowDailyDialog(true);
              }}
            >
              <DailyDialog
                day={day}
                schedules={schedules}
                setSchedule={setSchedule}
                showDailyDialog={showDailyDialog}
                setShowDailyDialog={setShowDailyDialog}
                setScheduleDialog={setShowDialog}
              />
              <Typography variant="caption" sx={{ marginRight: "10px" }}>
                他{schedules.length - 3}件
              </Typography>
            </Box>
          </ScheduleStyle>
        )}
      </Box>
      <DiaryDialog
        day={day}
        diary={currentDiary}
        setDiary={setCurrentDiary}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </Box>
  );
};
