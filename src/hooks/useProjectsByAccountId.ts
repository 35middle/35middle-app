import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export type ProjectEntity = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  color?: string;
  accountId: string;
};

const useProjectsByAccountId = (accountId: string) => {
  const { data, error } = useSWR<ProjectEntity[]>(
    `/api/account/${accountId}/projects`,
    fetcher
  );

  return {
    projects: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProjectsByAccountId;
