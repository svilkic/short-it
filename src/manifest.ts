import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'short-it',
  description:
    'Take control of YouTube shorts. Play, pause, fast forward, rewind, adjust volume, and easily navigate video timelines. ',
  version: '1.0.0',
  manifest_version: 3,
  icons: {
    '128': 'icons/logo.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'icons/logo.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['https://www.youtube.com/*', 'https://www.youtube.com/*'],
      js: ['src/content/index.ts'],
      // css: ['./index.ts.*'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  permissions: ['tabs', 'storage'],
})
