import useSWR from 'swr';

export type ProjectEntity = {
  id: string;
  name: string;
  logoPath: string;
  brandColor?: string;
  accountId: string;
};

const useProjectsByAccountId = (
  accountId: string
): {
  projects: ProjectEntity[];
  isLoading: boolean;
  error: Error | null | undefined;
} => {
  const { data, error } = useSWR<ProjectEntity[]>(
    `/api/account/${accountId}/projects`,
    async (url) => {
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
    }
  );

  return {
    projects: data || [],
    isLoading: !error && !data,
    error,
  };
};

export default useProjectsByAccountId;
