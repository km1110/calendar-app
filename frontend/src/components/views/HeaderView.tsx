import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { HeaderTemplate } from "@/components/templates/HeaderTemplate";
import { useContext } from "react";
import { MonthContext } from "@/provider/CalendarProvider";
import { makeInstance } from "@/libs/api/axios";
import dayjs from "dayjs";
import { getStartAndEndDate } from "@/libs/service/calender";
import { useRecoilState } from "recoil";
import { pageState } from "@/atoms/pageState";

export const HeaderView = () => {
  const [page, setPage] = useRecoilState<string>(pageState); // ["main", "calendar", "schedule"
  const { setSchedules } = useContext(MonthContext);

  const navigate = useNavigate();

  const instance = makeInstance();

  const handleGetSchedules = (displayMonth: dayjs.Dayjs) => {
    const { start, end } = getStartAndEndDate(displayMonth);
    instance
      .get("/schedule", {
        params: {
          start: start,
          end: end,
        },
      })
      .then(({ data }) => {
        setSchedules(data);
      })
      .catch((error) => {
        console.error("An error occurred while fetching the schedules:", error);
      });
  };

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        setSchedules([]);
        setPage("main");
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/signin");
  };

  return (
    <HeaderTemplate
      handleGetSchedules={handleGetSchedules}
      handleSignOut={handleSignOut}
    />
  );
};
