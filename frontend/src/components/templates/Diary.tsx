import { useContext, useState } from "react";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { SetterOrUpdater, useRecoilState } from "recoil";

import { DisplayDiary } from "@/components/parts/DisplayDiary";
import { EditDiary } from "@/components/parts/EditDiary";
import { diaryType } from "@/types/diary";
import { getStartAndEndDate } from "@/libs/service/calender";
import { makeInstance } from "@/libs/api/axios";
import { MonthContext } from "@/provider/CalendarProvider";
import { diarysState } from "@/atoms/diarysState";

type Props = {
  day: dayjs.Dayjs;
  diary: diaryType;
  setDiary: SetterOrUpdater<diaryType>;
  isOpen: boolean;
  onClose: () => void;
};

export const Diary = ({ day, diary, setDiary, isOpen, onClose }: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const [diarys, setDiarys] = useRecoilState<diaryType[]>(diarysState);
  const { daySelected } = useContext(MonthContext);

  const instance = makeInstance();

  // diaryに関する処理
  const handleAddDiary = async (diaryInfo: diaryType) => {
    const body = {
      title: diaryInfo.title,
      content: diaryInfo.content,
      date: diaryInfo.date,
    };

    const { start, end } = getStartAndEndDate(daySelected);

    await instance.post("/diarys", body);
    instance
      .get("/diarys", {
        params: {
          start: start,
          end: end,
        },
      })
      .then(({ data }) => {
        setDiarys(data);
      });
  };

  const handleChangeDiary = async (diaryInfo: diaryType) => {
    const body = {
      title: diaryInfo.title,
      content: diaryInfo.content,
      date: diaryInfo.date,
    };

    const { start, end } = getStartAndEndDate(daySelected);

    await instance.patch(`/diarys/${diary.id}`, body);
    instance
      .get("/diarys", {
        params: {
          start: start,
          end: end,
        },
      })
      .then(({ data }) => {
        setDiarys(data);
      });
  };

  const handleEditDiary = async (diaryInfo: diaryType) => {
    console.log(diaryInfo);
    if (diaryInfo.id) {
      await handleChangeDiary(diaryInfo);
    } else {
      await handleAddDiary(diaryInfo);
    }

    setIsEdit(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle sx={{ borderBottom: "1px solid #ccc" }}>日記</DialogTitle>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogActions></DialogActions>
      <DialogContent sx={{ width: "500px", height: "600px" }}>
        <Typography sx={{ marginBottom: "20px" }}>
          {day.format("YYYY年MM月DD日")}
        </Typography>
        <Box sx={{ width: "450px", height: "550px" }}>
          {isEdit ? (
            <EditDiary
              diary={diary}
              setDiary={setDiary}
              handleEditDiary={handleEditDiary}
            />
          ) : (
            <DisplayDiary diary={diary} setIsEdit={setIsEdit} />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
