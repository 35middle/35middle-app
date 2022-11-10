import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import * as React from 'react';

interface VideoCardProps {
  img: string;
  title?: string;
  subtitle?: string;
}

export default function VideoCard({ img, title, subtitle }: VideoCardProps) {
  return (
    <ImageListItem key={img}>
      <img src={`${img}`} alt={title} loading="lazy" />
      <ImageListItemBar
        title={title}
        subtitle={subtitle}
        actionIcon={
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={`info about ${title}`}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  );
}
