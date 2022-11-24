import { Box, Slider } from '@mui/material';
import * as React from 'react';

function valuetext(value: number) {
  return `${value}s`;
}
const duration = 596;
const start = 0;

// interface HandleChangeCommitted {
//   handleChangeCommitted: (arg: Array<number> | number) => void;
// }

interface ProgressBarPropsType {
  onChangeCommitted: (
    event: React.SyntheticEvent | Event,
    value: number | Array<number>
  ) => void;
}

const ProgressBar = ({ onChangeCommitted }: ProgressBarPropsType) => {
  // const [value, setValue] = React.useState<number[]>([0, 0]);
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
      <Box sx={{ width: 600 }} className="flex flex-col justify-center px-5">
        <Slider
          className="flex justify-center mx-auto my-14"
          getAriaLabel={() => 'video time range'}
          defaultValue={[0, duration]}
          onChangeCommitted={onChangeCommitted}
          getAriaValueText={valuetext}
          sx={{ width: 550 }}
          marks={marks}
          min={start}
          max={duration}
          valueLabelDisplay="on"
          valueLabelFormat={valueLabelFormat}
        />
      </Box>
    </>
  );
};

export default ProgressBar;
