import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

import AppBar from './AppBar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="flex h-screen w-full flex-col px-1 text-gray-700 antialiased">
    {props.meta}
    <AppBar title={AppConfig.title} />
    <div className="grow">
      <div className="mx-auto max-w-screen-md">
        <div className="border-b border-gray-300">
          <div className="pt-16 pb-8">
            <div className="text-3xl font-bold text-gray-900">
              {AppConfig.title}
            </div>
            <div className="text-xl">{AppConfig.description}</div>
          </div>

          <div>
            <ul className="flex flex-wrap text-xl">
              <li className="mr-6">
                <Link href="/">
                  <a className="border-none text-gray-700 hover:text-gray-900">
                    Home
                  </a>
                </Link>
              </li>
              <li className="mr-6">
                <Link href="/about/">
                  <a className="border-none text-gray-700 hover:text-gray-900">
                    About
                  </a>
                </Link>
              </li>
              <li className="mr-6">
                <a
                  className="border-none text-gray-700 hover:text-gray-900"
                  href="https://github.com/ixartz/Next-js-Boilerplate"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="content py-5 text-xl">{props.children}</div>
      </div>
    </div>

    <footer>
      <p className="my-0 border-t border-gray-300 py-8 text-center text-sm">
        Copyright ©{new Date().getFullYear()} {AppConfig.title} {}
        <span role="img" aria-label="Love">
          all rights reserved.
        </span>
      </p>
    </footer>
  </div>
);

export { Main };
