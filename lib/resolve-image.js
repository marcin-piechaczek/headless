if (!process.browser) {
  const { URL } = require('url');
  global.URL = URL;
}

export const resolveImage = (url) => {
  if (!url) return undefined;

  const { pathname } = new URL(url);

  if (pathname) {
    return process.env.STOREFRONT_URL + '/store' + pathname;
  } else {
    return url;
  }
};
