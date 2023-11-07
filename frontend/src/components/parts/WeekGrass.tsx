import { Box } from "@mui/material";

import { todoDayRatioType } from "@/types/todo";

type Props = {
  weekContributions: todoDayRatioType[];
  getColor: (ratio: number) => string;
};

export const WeekGrass = ({ weekContributions, getColor }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {weekContributions.map((dayContribution, index) => (
        <Box
          key={index}
          sx={{
            width: "12px",
            height: "12px",
            borderRadius: "2px",
            margin: "1px",
            backgroundColor: getColor(dayContribution.ratio),
          }}
        />
      ))}
    </Box>
  );
};
