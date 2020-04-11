import React, { FC } from 'react';

const pages = ['imgxxxx'];

const index: FC = () => (
  <ul>
    {pages.map((page) => (
      <ul key={page}>
        <a href={`/${page}`}>{page}</a>
      </ul>
    ))}
  </ul>
);

export default index;
