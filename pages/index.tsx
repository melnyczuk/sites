import React, { FC } from 'react';
import fs from 'fs';

const pages = fs
  .readdirSync('./pages')
  .filter(filename => filename !== 'index.tsx')
  .map(filename => filename.split('.')[0]);

const index: FC = () => (
  <ul>
    {pages.map(page => (
      <ul key={page}>
        <a href={`/${page}`} >
          {page}
        </a>
      </ul>
    ))}
  </ul>
);

export default index;
