import { Box } from "@mui/material";
import React from "react";
import { Top } from "../templates/Top";
import { TopHeader } from "../parts/TopHeader";

export const TopView = () => {
  return (
    <div>
      <TopHeader />
      <Top />
    </div>
  );
};
