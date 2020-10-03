/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withCSS = require('@zeit/next-css');

const works = ['imgxxxx', 'squiggle', 'ahirespngofarock'];

module.exports = withCSS({
  exportPathMap: () =>
    works.reduce(
      (acc, work) => ({ ...acc, [`/${work}`]: { page: `/${work}` } }),
      {
        '/': { page: '/' },
      }
    ),
});
