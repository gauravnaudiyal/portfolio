export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: Missing API Key.' });
  }

  try {
    const payload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const googleRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      }
    );

    const data = await googleRes.json();

    if (!googleRes.ok) {
      console.error('Gemini API Error:', data);
      return res.status(googleRes.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server Internal Error:', error);
    return res.status(500).json({ error: 'Failed to communicate with AI provider.' });
  }
}