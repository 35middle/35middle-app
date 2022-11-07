import { useRouter } from 'next/router';
import React from 'react';

import CustomButton from '../components/CustomButton';

const testButtonPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <div className="flex justify-center align-middle">
      <div className="relative">
        <video width="600" height="400" controls autoPlay muted>
          <source src={`${router.basePath}/demo.mp4`} type="video/mp4" />
        </video>
        <CustomButton name={'ADD TO CART'} />
      </div>
    </div>
  );
};

export default testButtonPage;
