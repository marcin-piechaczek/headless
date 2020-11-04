if (!process.browser) {
  const { URL } = require('url');
  global.URL = URL;
}

export const resolveImage = (url) => {
  if (!url) return undefined;
  const domain =
    process.env.VERCEL_URL.length > 0 ? process.env.VERCEL_URL : process.env.STOREFRONT_URL;

  const { pathname } = new URL(url);

  if (pathname) {
    return domain + '/store' + pathname;
  } else {
    return url;
  }
};
