const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  // Base application title used in document.title
  title: 'Rebase Radio',

  // use cname option to add CNAME file to webpack build
  // CNAME file allows to use custom domain names with gh-pages, example:
  // cname: 'omatsuri.app'
  cname: 'rebase.radio',

  // add repo path for username.github.io/repoPath for react router to recognize paths,
  // use only when deployed to github.io, leave as null for deployments with custom domains
  // repoPath: '/rebase-radio',
  repoPath: null,

  // Websocket Server for real-time multi-user functionality.
  // websocketServer: ENV === 'production' ? null : 'localhost:3000',
  // websocketServer: ENV === 'production' ? 'coherent-rite-293701.uc.r.appspot.com' : 'localhost:3000',
  websocketServer: null,

  // list of routes that should be prerendered
  // list should always contain '/' and '/404' for gh-pages to recognize app
  prerenderRoutes: ['/', '/404'],
};
