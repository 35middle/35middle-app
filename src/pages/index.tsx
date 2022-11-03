import { useEffect, useState } from 'react';

type Project = {
  name: string;
  logo: string;
};

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        accountId: '456',
      }),
    });

    const fetchedProjects = await response.json();
    setProjects(fetchedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (!projects.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {projects.map((project) => {
        return (
          <>
            <div>{project.name}</div>
            <div>{project.logo}</div>
          </>
        );
      })}
    </>
  );
};

export default Index;
