import Box from '@mui/material/Box';
import type { LinearProgressProps } from '@mui/material/LinearProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const LinearProgressWithLabel = (
  props: LinearProgressProps & {
    value: number;
    isProcessing?: boolean;
    isDone?: boolean;
  }
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {/* eslint-disable-next-line no-nested-ternary */}
          {props.isDone
            ? 'Done'
            : props.isProcessing
            ? 'Processing...'
            : `${Math.round(props.value)}%`}
          {}
        </Typography>
      </Box>
    </Box>
  );
};

type Props = {
  value?: number;
  isProcessing?: boolean;
  isDone?: boolean;
};

const LinearWithValueLabel = ({ value = 0, isProcessing, isDone }: Props) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel
        value={value}
        isProcessing={isProcessing}
        isDone={isDone}
      />
    </Box>
  );
};

export default LinearWithValueLabel;
