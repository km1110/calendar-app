import { useRecoilState } from "recoil";

import { diaryState } from "@/atoms/diaryState";
import { diarysState } from "@/atoms/diarysState";
import { makeInstance } from "@/libs/api/axios";
import { diaryType } from "@/types/diary";

export const useDiary = (action: "diary" | "diarys") => {
  const [diary, setDiary] = useRecoilState<diaryType>(diaryState);
  const [diarys, setDiarys] = useRecoilState<diaryType[]>(diarysState);
  const instance = makeInstance();

  const handleFetchDiary = async (start: string, end: string) => {
    await instance
      .get("/diarys", {
        params: {
          start_date: start,
          end_date: end,
        },
      })
      .then(({ data }) => {
        if (data !== null) {
          if (action === "diary") setDiary(data[0]);
          else if (action === "diarys") setDiarys(data);
        }
      });
  };

  const handleFetchDiarys = async (start: string, end: string) => {
    await instance
      .get("/diarys", {
        params: {
          start_date: start,
          end_date: end,
        },
      })
      .then(({ data }) => {
        if (action === "diary") setDiary(data[0]);
        else if (action === "diarys") setDiarys(data);
      });
  };

  const handleCreateDiary = async (
    diary: diaryType,
    start: string,
    end: string
  ) => {
    const body = {
      title: diary.title,
      content: diary.content,
      date: diary.date,
    };

    await instance.post("/diarys", body);
    instance
      .get("/diarys", {
        params: {
          start_date: start,
          end_date: end,
        },
      })
      .then(({ data }) => {
        if (action === "diary") setDiary(data[0]);
        else if (action === "diarys") setDiarys(data);
      });
  };

  const handleUpdateDiary = async (
    diary: diaryType,
    start: string,
    end: string
  ) => {
    const body = {
      title: diary.title,
      content: diary.content,
      date: diary.date,
    };

    await instance.patch(`/diarys/${diary.id}`, body);
    instance
      .get("/diarys", {
        params: {
          start_date: start,
          end_date: end,
        },
      })
      .then(({ data }) => {
        if (action === "diary") setDiary(data[0]);
        else if (action === "diarys") setDiarys(data);
      });
  };

  return {
    handleFetchDiary,
    handleFetchDiarys,
    handleCreateDiary,
    handleUpdateDiary,
  };
};
