import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { HeaderTemplate } from "@/components/templates/HeaderTemplate";

export const HeaderView = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/signin");
  };

  return <HeaderTemplate handleSignOut={handleSignOut} />;
};
