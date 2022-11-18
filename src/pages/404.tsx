import { Box, Button } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';

import UnauthorizedLayout from '@/layouts/UnauthorizedLayout';

const NotFound = () => {
  return (
    <>
      <UnauthorizedLayout title="404 | Page not found">
        <Box className="flex justify-center">
          <Link href="/">
            <Button variant="contained" color="primary" size="large">
              Back to Home
            </Button>
          </Link>
        </Box>
      </UnauthorizedLayout>
    </>
  );
};

export default NotFound;
