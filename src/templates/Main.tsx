import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div>
    <div>
      <div>{props.children}</div>
    </div>
  </div>
);

export { Main };
