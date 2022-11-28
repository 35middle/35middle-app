import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import * as React from 'react';

export default function VideoList({
  children,
}: {
  children: NonNullable<React.ReactNode>;
}) {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  let cols;
  if (isDesktop) {
    cols = 5;
  } else if (isTablet) {
    cols = 3;
  } else {
    cols = 2;
  }

  return (
    <ImageList cols={cols} gap={15}>
      {children}
    </ImageList>
  );
}
