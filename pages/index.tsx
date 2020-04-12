import React, { FC, CSSProperties } from 'react';
import '../public/static/base.css';

const pages = ['imgxxxx', 'another'];

const styles: Record<HTMLElement['namespaceURI'], CSSProperties> = {
  a: {
    fontFamily: '"Archivo", sans-serif',
    fontSize: '40px',
    fontWeight: 'bold',
    padding: '8px',
    width: '100%',
    float: 'left',
  },
  li: {
    float: 'left',
    width: '100%',
    margin: '2px',
    borderLeft: '4px solid black',
    borderTop: '4px solid black',
  },
  ul: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '256px',
  },
};

const index: FC = () => (
  <ul style={styles.ul}>
    {pages.map((page) => (
      <li style={styles.li} key={page}>
        <a style={styles.a} href={`/${page}`}>
          {page}
        </a>
      </li>
    ))}
  </ul>
);

export default index;
