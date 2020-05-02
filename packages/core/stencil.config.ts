import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'ionic-selectable',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: '../package.json' }
      ]
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  plugins: [
    sass()
  ]
};
