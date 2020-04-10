/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  exportPathMap: () =>
    fs
      .readdirSync('./pages')
      .filter((s) => s !== 'index.tsx')
      .map((s) => s.split('.')[0])
      .reduce((acc, page) => ({ ...acc, [page]: { page } }), {
        '/': { page: '/' },
      }),
  webpack: (config) => config,
});
