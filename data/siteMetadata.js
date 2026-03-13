/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'AIM for Pathology Team',
  author: 'AIM for Pathology',
  headerTitle: 'AIM for Pathology',
  description:
    'We build intelligent foundation models and multimodal agents to bridge the gap between microscopic pathology and macroscopic medical imaging.',
  language: 'en-us',
  theme: 'dark',
  siteUrl: 'https://zhaolin-yu.github.io/aim-pathology',
  siteRepo: 'https://github.com/AIM-Pathology',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'contact@aim-pathology.example.com',
  github: 'https://github.com/AIM-Pathology',
  x: 'https://twitter.com/AIM_Pathology',
  twitter: 'https://twitter.com/AIM_Pathology',
  facebook: '',
  youtube: '',
  linkedin: '',
  threads: '',
  instagram: '',
  medium: '',
  bluesky: '',
  mastodon: '',
  locale: 'en-US',
  stickyNav: true,
  analytics: {},
  newsletter: {},
  comments: {},
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
