import useSWR from 'swr';

export type VideoEntity = {
  id: string;
  name: string;
  thumbnail: string;
  preview: string;
  videoUrl: string;
  projectId: string;
  length: number;
};

const useVideoById = (
  targetUrl: string
): {
  video: VideoEntity | undefined;
  isLoading: boolean;
  error: Error | null | undefined;
} => {
  const { data, error } = useSWR<VideoEntity>(targetUrl, async (url) => {
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
    video: data,
    isLoading: !error && !data,
    error,
  };
};

export default useVideoById;
