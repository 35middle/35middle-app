import {
  Box,
  FormControl,
  OutlinedInput,
  Slider,
  Typography,
} from '@mui/material';
import * as React from 'react';

// const styledSliderThumb = {
//   root: {
//     height: 100,
//     width: 100,
//     coclor: '#D9D9D9',
//   }
// };

// interface State {
//   amount: number;
// }

// const InputAdornments = () => {
//   const [values, setValues] = React.useState<State>({
//     amount: '',
//   });
// };

const marks = [
  {
    value: 0,
    label: '00:00',
  },
  {
    value: 100,
    label: '05:00',
  },
];

const valuetext = (value: number) => {
  return `${value}°C`;
};

const ProgressBar = () => {
  // const [value, setValue] = React.useState<number[]>([0, 37]);
  // const handleChange = (event: Event, newValue: number | number[]) => {
  //   setValue(newValue as number[]);
  // };
  // const handleChangeInputValues =
  //   (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValue({ ...value, [prop]: event.target.value });
  //   };

  return (
    <>
      <Box
        className="p-10"
        sx={{ width: 300, height: 300, backgroundColor: '#fff' }}
      >
        <Typography variant="h4" className="my-4">
          Progress bar
        </Typography>
        {/* <Slider
          aria-label="Custom marks"
          defaultValue={20}
          getAriaValueText={valuetext}
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
        ></Slider> */}
        <Slider
          className="my-8"
          getAriaLabel={() => 'video time range'}
          // value={value}
          // onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          sx={{ color: '#CA4F79' }}
          marks={marks}
          // classes={{ root: styledSliderThumb.root }}
        ></Slider>
        <Typography variant="h5" className="my-4">
          {' '}
          Start - End
        </Typography>
        <Box className="flex">
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-time"
              // value={value.amount}
              // onChange={handleChangeInputValues('amount')}
              // endAdornment={
              //   <InputAdornment position="end">seconds</InputAdornment>
              // }
              aria-describedby="outlined-weight-helper-text"
              // inputProps={{
              //   'aria-label': 'seconds',
              // }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-time"
              // value={value.seconds}
              // onChange={handleChangeInputValues('amount')}
              // endAdornment={
              //   <InputAdornment position="end">seconds</InputAdornment>
              // }
              aria-describedby="outlined-weight-helper-text"
              // inputProps={{
              //   'aria-label': 'seconds',
              // }}
            />
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default ProgressBar;
