import ImageList from '@mui/material/ImageList';
import * as React from 'react';

export default function VideoList({
  children,
}: {
  children: NonNullable<React.ReactNode>;
}) {
  return (
    <ImageList cols={5} gap={15}>
      {children}
    </ImageList>
  );
}
