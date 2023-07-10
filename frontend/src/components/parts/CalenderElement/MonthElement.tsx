import dayjs from "dayjs";

export const MonthElement = (props: any) => {
  const { day, index } = props;

  const today = dayjs();

  return (
    <div>
      <header style={{ marginRight: "5px" }}>
        <span>{day.format("D")}</span>
      </header>
    </div>
  );
};
