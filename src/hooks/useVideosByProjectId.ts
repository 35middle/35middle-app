import useSWR from 'swr';

export type VideoEntity = {
  id: string;
  name: string;
  thumbnail: string;
  preview: string;
  videoUrl: string;
  projectId: string;
};

const useVideosByProjectId = (
  targetUrl: string
): {
  videos: VideoEntity[];
  isLoading: boolean;
  error: Error | null | undefined;
} => {
  const { data, error } = useSWR<VideoEntity[]>(targetUrl, async (url) => {
    const res = await fetch(url);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (res.ok) {
      return res.json();
    }
    if (res.status === 401) {
      throw new Error('Unauthorized');
    } else {
      throw new Error('Unexpected error');
    }
  });

  return {
    videos: data || [],
    isLoading: !error && !data,
    error,
  };
};

export default useVideosByProjectId;
