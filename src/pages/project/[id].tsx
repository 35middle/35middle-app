import { Box, Button, Grid } from '@mui/material';
import * as React from 'react';

import VideoCard from '@/components/VideoCard';
import VideoList from '@/components/VideoList';

interface VideoSummary {
  id: string;
  img: string;
  title: string;
  author: string;
}

const videoData: VideoSummary[] = [
  {
    id: '2c2a2973-3721-414e-9aa5-5445e5026056',
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    id: '85fc9bb9-3f11-4a89-949e-eae8a51b9e55',
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    id: 'e4151133-0d30-4b28-84c6-d42ee76f9840',
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'c75e7fc8-8b35-4031-8cf5-f4c89b6f0f3c',
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    id: '1198af2c-0050-442c-8f08-3c2aefe730fe',
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    id: 'd7d08655-7b86-4886-82da-7bb285a29233',
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    id: '56643fe6-9bf0-4144-820d-f6dad8fdbd85',
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
];

export default function ProjectPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" href="/video/create">
        NEW VIDEO
      </Button>
      <VideoList>
        {videoData.map(({ id, img, title, author }) => (
          <VideoCard key={id} img={img} title={title} subtitle={author}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button variant="contained" href={`/video/${id}/edit`}>
                  EDIT
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log(`delete video ${id}`);
                  }}
                >
                  DELETE
                </Button>
              </Grid>
            </Grid>
          </VideoCard>
        ))}
      </VideoList>
    </Box>
  );
}
