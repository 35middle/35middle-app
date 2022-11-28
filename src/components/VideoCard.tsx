import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import * as React from 'react';

interface VideoCardProps {
  img: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function VideoCard({
  img,
  title,
  subtitle,
  children,
}: VideoCardProps) {
  return (
    <ImageListItem>
      <img src={`${img}`} alt={title} loading="lazy" />
      <ImageListItemBar position="top" title={title} subtitle={subtitle} />
      {children ? <ImageListItemBar title={children} /> : null}
    </ImageListItem>
  );
}
