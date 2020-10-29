import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import '../public/static/base.css';

type AppPageProps<T> = {
  Component: FC<T>;
  pageProps: T;
};

function AppPage<T>({
  Component,
  pageProps,
}: AppPageProps<T>): ReturnType<FC<T>> {
  return <Component {...pageProps} />;
}

export default dynamic(() => Promise.resolve(AppPage), { ssr: false });
