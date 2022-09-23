import Image from 'next/image';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const ForgetPassword = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <div className="fixed inset-1/4 flex h-3/6 w-3/6 flex-col items-center justify-center">
      <Image
        src="/assets/images/logo.png"
        alt="logo"
        width={200}
        height={200}
      />
      <p className="mt-10">Magic Link to reset password</p>
      <input
        type="text"
        placeholder="email"
        className="input-bordered input-success input mt-5 w-full max-w-xs"
      />
      <button className="btn-outline btn-accent btn mt-3">Submit</button>
    </div>
  </Main>
);

export default ForgetPassword;
