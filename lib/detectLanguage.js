const detectLanguage = (ctx) => {
  if (process.browser) {
    return navigator.language.slice(0, 2);
  }
  return ctx.req.headers['accept-language'].slice(0, 2);
};

export default detectLanguage;
