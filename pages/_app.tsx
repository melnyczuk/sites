/* eslint-disable react/jsx-filename-extension */
import React, { FC } from 'react';
import '../public/static/fonts.css';

interface AppProps<T> {
  Component: FC<T>; 
  pageProps: T;
}

const App: FC<AppProps<any>> = ({ Component, pageProps }) => (<Component {...pageProps} />);

export default App;
