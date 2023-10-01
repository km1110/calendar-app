import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { HeaderTemplate } from "@/components/templates/HeaderTemplate";
import { useContext } from "react";
import { MonthContext } from "@/provider/CalendarProvider";

export const HeaderView = () => {
  const navigate = useNavigate();

  const { setSchedules } = useContext(MonthContext);

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        setSchedules([]);
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/signin");
  };

  return <HeaderTemplate handleSignOut={handleSignOut} />;
};
