import React, { FC } from 'react';
import { join } from 'path';

import { Styles } from '../types';
import '../public/static/base.css';

const styles: Styles = {
  a: {
    fontFamily: '"Archivo", sans-serif',
    fontSize: '40px',
    fontWeight: 'bold',
    padding: '8px 16px',
    float: 'left',
  },
  li: {
    float: 'left',
    margin: '2px',
    borderLeft: '4px solid black',
    borderTop: '4px solid black',
  },
  ul: {
    display: 'grid',
    margin: '0 auto',
    width: 'max-content',
  },
};

export const getStaticProps = async (): Promise<{
  props: { works: string[] };
}> => ({
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
      .filter((page) => page !== 'index'),
  },
});

const index: FC<{ works: string[] }> = ({ works }) => (
  <ul style={styles.ul}>
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
