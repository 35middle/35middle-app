import { Box, Slider, Typography } from '@mui/material';
import * as React from 'react';

function valuetext(value: number) {
  return `${value}s`;
}
const duration = 596;
const start = 0;

interface HandleChangeVideoTime {
  handleChangeVideoTime: (arg: Array<number>) => void;
}

const ProgressBar: React.FC<HandleChangeVideoTime> = ({
  handleChangeVideoTime,
}) => {
  const [value, setValue] = React.useState<number[]>([0, 0]);
  const valueLabelFormat = (second: number) => {
    let minutes: number | string = Math.floor(second / 60);
    let seconds: number | string = second - minutes * 60;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  const handleChange = (__event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    handleChangeVideoTime(value);
  };
  const marks = [
    {
      value: 0,
      label: '00:00',
    },
    {
      value: duration,
      label: `${valueLabelFormat(duration)}`,
    },
  ];

  return (
    <>
      <Box sx={{ width: 600, height: 300 }}>
        <Typography variant="h6" className="my-8">
          Progress bar
        </Typography>
        <Slider
          className="flex justify-center mx-auto my-8"
          getAriaLabel={() => 'video time range'}
          defaultValue={[0, duration]}
          onChange={handleChange}
          getAriaValueText={valuetext}
          sx={{ width: 550 }}
          marks={marks}
          min={start}
          max={duration}
          valueLabelDisplay="on"
          valueLabelFormat={valueLabelFormat}
        ></Slider>
      </Box>
    </>
  );
};

export default ProgressBar;
