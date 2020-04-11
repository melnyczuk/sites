/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs');

const clientSide = (isServer) => (isServer ? 'empty' : true);
const serverSide = (isServer) => (isServer ? true : 'empty');

module.exports = {
  exportPathMap: () =>
    fs
      .readdirSync('./pages')
      .filter((s) => s !== 'index.tsx')
      .map((s) => s.split('.')[0])
      .reduce((acc, page) => ({ ...acc, [page]: { page } }), {
        '/': { page: '/' },
      }),
  webpack: (config, { isServer }) => ({
    ...config,
    node: {
      ...config.node,
      fetch: clientSide(isServer),
      window: clientSide(isServer),
    },
  }),
};
