import { Card, Paper, Typography } from "@mui/material";

interface StatBoxProps {
  wordStat: string | null | undefined;
}

const StatBox = ({ wordStat }: StatBoxProps) => {
  return (
    <Paper className="h-[200px] w-[200px] my-5 text-white rounded-[8%] ">
      <Card className="h-full w-full flex items-center justify-center rounded-[8%]">
        <Typography>{wordStat}</Typography>
      </Card>
    </Paper>
  );
};

export default StatBox;
