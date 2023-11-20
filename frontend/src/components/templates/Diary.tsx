import { useState } from "react";

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
import { useRecoilState } from "recoil";

import { DisplayDiary } from "@/components/parts/DisplayDiary";
import { EditDiary } from "@/components/parts/EditDiary";
import { diaryType } from "@/types/diary";
import { diaryState } from "@/atoms/diaryState";

type Props = {
  day: dayjs.Dayjs;
  isOpen: boolean;
  onClose: () => void;
};

export const Diary = ({ day, isOpen, onClose }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [diary, setDiary] = useRecoilState<diaryType>(diaryState);
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
              setIsEdit={setIsEdit}
            />
          ) : (
            <DisplayDiary
              diary={diary}
              setDiary={setDiary}
              setIsEdit={setIsEdit}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
