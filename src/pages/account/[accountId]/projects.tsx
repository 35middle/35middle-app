import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import type { BasePageProps } from '@/types';

export { getServerSideProps } from '@/core/auth';

type Props = BasePageProps;

const Projects = (props: Props) => {
  return (
    <AuthorizedLayout {...props}>
      <div>projects</div>;
    </AuthorizedLayout>
  );
};

export default Projects;
