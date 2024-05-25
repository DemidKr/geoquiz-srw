import React, { FC } from "react";
import { Box, Grid, Input, Slider, Typography } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import { TimeValues } from "../../shared/consts/enum";

interface ITimeSliderProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  defaultTime?: number;
}

const TimeSlider: FC<ITimeSliderProps> = ({ time, setTime, defaultTime }) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setTime(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(
      event.target.value === "" ? TimeValues.MIN : Number(event.target.value),
    );
  };

  const handleBlur = () => {
    if (time < TimeValues.MIN) {
      setTime(TimeValues.MIN);
    } else if (time > TimeValues.MAX) {
      setTime(TimeValues.MAX);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Время одного этапа
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TimerIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof time === "number" ? time : TimeValues.MIN}
            onChange={handleSliderChange}
            min={TimeValues.MIN}
            max={TimeValues.MAX}
            aria-labelledby="input-slider"
            defaultValue={defaultTime}
          />
        </Grid>
        <Grid item>
          <Input
            value={time}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: TimeValues.MIN,
              max: TimeValues.MAX,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            defaultValue={defaultTime}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimeSlider;
