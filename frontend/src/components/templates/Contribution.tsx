import { Box, Card, Typography } from "@mui/material";

import { todoDayRatioType } from "@/types/todo";
import { WeekGrass } from "../parts/WeekGrass";

type Props = {
  dayRatio: todoDayRatioType[];
};

export const Contribution = ({ dayRatio }: Props) => {
  // console.log(dayRatio.length);
  const weeks = [];

  const colors = [
    "#ebedf0",
    "#9be9a8",
    "#40c463",
    "#30a14e",
    "#216e39",
    "#215230",
  ];

  const year = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < 52; i++) {
    weeks.push(dayRatio.slice(i * 7, (i + 1) * 7));
  }

  const getColor = (ratio: number) => {
    return colors[ratio];
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <Card
        variant="outlined"
        sx={{ padding: "10px", border: "1px solid #e1e4e8" }}
      >
        <Typography marginBottom="5px">performance</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "14px" }}>
          {year.map((month, index) => (
            <Typography
              key={index}
              sx={{
                width: "calc(14px * 4)",
                marginLeft: "1px",
                marginRight: "1px",
                textAlign: "center",
                color: "#586069",
              }}
            >
              {month}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", width: "fit-content" }}>
          {weeks.map((weekContributions, index) => (
            <WeekGrass
              weekContributions={weekContributions}
              getColor={getColor}
              key={index}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "right",
            marginTop: "10px",
          }}
        >
          <Typography sx={{ marginRight: "5px", color: "#586069" }}>
            fight
          </Typography>
          {colors.map((color, index) => (
            <Box
              key={index}
              sx={{
                width: "12px",
                height: "12px",
                borderRadius: "2px",
                margin: "1px",
                backgroundColor: color,
              }}
            />
          ))}
          <Typography
            sx={{ marginLeft: "5px", marginRight: "5px", color: "#586069" }}
          >
            good
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};
