import { Box, Card, Typography } from "@mui/material";

import { todoDayRatioType } from "@/types/todo";
import { WeekGrass } from "@/components/parts/WeekGrass";
import { YEAR } from "@/config/year";
import { COLORS } from "@/config/colors";
import { createYearCalender } from "@/libs/service/calender";

type Props = {
  dayRatio: todoDayRatioType[];
};

export const Contribution = ({ dayRatio }: Props) => {
  const weeks = [];

  for (let i = 0; i < 52; i++) {
    weeks.push(dayRatio.slice(i * 7, (i + 1) * 7));
  }

  const getColor = (ratio: number) => {
    return COLORS[ratio];
  };

  const yearColendar = createYearCalender();

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
        sx={{
          width: "1020px",
          border: "1px solid #f5f5f5",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography
          sx={{
            marginTop: "10px",
            marginLeft: "10px",

            fontFamily: "helvetica neue",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          performance
        </Typography>
        <Box sx={{ padding: "7px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: "14px",
            }}
          >
            {YEAR.map((month, index) => (
              <Typography
                key={index}
                sx={{
                  width: "calc(14px * 4)",
                  marginLeft: "1px",
                  marginRight: "1px",
                  textAlign: "center",
                  fontFamily: "helvetica neue",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#586069",
                }}
              >
                {month}
              </Typography>
            ))}
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {yearColendar.map((week, index) => (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {week.map((day, index) => (
                    <Box
                      sx={{
                        width: "12px",
                        height: "12px",
                        border: "1px solid #ebedf0",
                        borderRadius: "2px",
                        margin: "1px",
                        backgroundColor: "#ffffff",
                      }}
                    />
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
          {/* <Box
            sx={{
              display: "flex",

              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {weeks.map((weekContributions, index) => (
              <WeekGrass
                weekContributions={weekContributions}
                getColor={getColor}
                key={index}
              />
            ))}
          </Box> */}
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
            {COLORS.map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "2px",
                  margin: "1px",
                  border: "1px solid #e1e4e8",
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
        </Box>
      </Card>
    </Box>
  );
};
