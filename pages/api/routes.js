export default function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const { url, lang } = body;
    let redirectUrl = url;

    if (lang === 'en' && url === '/graty.html') {
      redirectUrl = 'gear.html';
    }

    if (lang === 'pl' && url === '/gear.html') {
      redirectUrl = 'graty.html';
    }

    res.status(200).json({ redirectUrl });
  }
}
