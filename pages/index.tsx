import React, { FC } from 'react';
import { join } from 'path';
import { GetStaticProps } from 'next';

import { Styles } from '../types';
import '../public/static/base.css';

const EXCLUDED_PAGES = ['index', '_app'];

const styles: Styles = {
  a: {
    fontFamily: '"Archivo", sans-serif',
    fontSize: '40px',
    fontWeight: 'bold',
    padding: '8px 16px',
    float: 'left',
  },
  h1: {
    display: 'flex',
    margin: '2px',
    border: '4px solid black',
    width: '100%',
  },
  li: {
    float: 'left',
    width: '100%',
    margin: '2px',
    borderLeft: '4px solid black',
    borderTop: '4px solid black',
    borderRight: '4px solid transparent',
  },
  ul: {
    display: 'grid',
    margin: '2px auto',
    width: 'max-content',
  },
};

type IndexPageProps = {
  works: string[];
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => ({
  props: {
    // eslint-disable-next-line no-undef
    works: await require('fs')
      .readdirSync('./pages')
      .map((page) => [
        // eslint-disable-next-line no-undef
        require('fs').statSync(join('./pages', page)).mtime,
        page,
      ])
      .sort(([a], [b]) => b.valueOf() - a.valueOf())
      .map(([, page]) => page.split('.ts')[0])
      .filter((page) => !EXCLUDED_PAGES.includes(page)),
  },
});

const index: FC<IndexPageProps> = ({ works }) => (
  <ul style={styles.ul}>
    <h1 style={styles.h1}>
      <a style={styles.a} href="https://www.melnycz.uk">
        melnycz.uk
      </a>
    </h1>
    {works.map((work) => (
      <li style={styles.li} key={work}>
        <a style={styles.a} href={`/${work}`}>
          {work}
        </a>
      </li>
    ))}
  </ul>
);

export default index;
