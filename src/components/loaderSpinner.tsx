import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { FadeLoader } from 'react-spinners';

const Loader = () => {
  return (
    <>
      {/* <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      /> */}
      <FadeLoader color="grey" />
    </>
  );
};

export default Loader;
