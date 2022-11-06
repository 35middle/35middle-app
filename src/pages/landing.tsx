import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const Landing = () => {
  return (
    <>
      <div
        className={
          'flex h-screen w-full flex-row items-center justify-between text-gray-200'
        }
      >
        <div
          className={'flex h-full w-1/4 flex-col items-center justify-start'}
        >
          <h1 className={'mt-20 mb-0 text-center'}>
            Welcome to <span className={'text-primary'}>35middle</span>
          </h1>
          <p className={'mb-5 w-2/3 text-center'}>
            Add hyper-link button at anywhere inside the video
          </p>
          <div className={'mb-10 h-0 w-2/3 border-solid'}></div>
          <Link href={'/login'} className={'justify-center'}>
            <Button
              variant={'contained'}
              size={'large'}
              className={'w-2/3 bg-primary'}
              data-testid={'login'}
            >
              LOGIN
            </Button>
          </Link>
          <Link href={'/register'} className={'justify-center'}>
            <Button
              variant={'contained'}
              size={'large'}
              className={'mt-4 w-2/3 bg-gray-100 text-primary'}
              data-testid={'register'}
            >
              REGISTER
            </Button>
          </Link>
        </div>
        <div
          className={
            'flex h-full w-3/4 items-center justify-center bg-gradient-to-r from-primary to-gray-400'
          }
        >
          <Image
            src={'/assets/images/landing-page-icon.svg'}
            width={'700%'}
            height={'700%'}
          />
        </div>
      </div>
    </>
  );
};

export default Landing;
