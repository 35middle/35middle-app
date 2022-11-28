import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

type Props = {
  alertMsg: string;
};

const PageAlert = ({ alertMsg }: Props) => {
  return (
    <Box className="flex h-full w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/auth-page-logo.svg"
        alt="logo"
        width="240"
        height="240"
      />
      <Typography variant="h3" className="mt-10 font-luckiestGuy">
        {alertMsg}
      </Typography>
    </Box>
  );
};
export default PageAlert;
