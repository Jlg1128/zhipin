import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  proxy: {
    '/doregister': {
      target: 'http://127.0.0.1:4000',
      changeOrigin: true,
    },
    '/doLogin': {
      target: 'http://127.0.0.1:4000',
      changeOrigin: true,
    },
    '/update': {
      target: 'http://127.0.0.1:4000',
      changeOrigin: true,
    },
  },
  theme: {
    '@primary-color': '#30b767',
  },
});
