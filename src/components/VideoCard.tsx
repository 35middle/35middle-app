import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import * as React from 'react';
import { useState } from 'react';

import type { VideoEntity } from '@/hooks/useVideosByProjectId';

type Props = VideoEntity & {
  thumbnail: string;
  videoUrl: string;
  name: string;
  children?: React.ReactNode;
};

export default function VideoCard({ thumbnail, name, children }: Props) {
  const [hidden, setHidden] = useState(true);
  return (
    <ImageListItem
      className="cursor-pointer"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <img src={thumbnail} alt={name} loading="lazy" />
      <ImageListItemBar position="top" title={name} />
      {children ? (
        <ImageListItemBar
          className={`${hidden && 'hidden'} transition-all`}
          title={children}
        />
      ) : null}
    </ImageListItem>
  );
}
