// OpenAI low-cost proxy for the existing Listing tool.
// Keeps the old /api/claude endpoint so index.html needs minimal changes.

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL_ANALYZE = process.env.OPENAI_MODEL_ANALYZE || 'gpt-5.4-mini';
const MODEL_WRITE = process.env.OPENAI_MODEL_WRITE || 'gpt-5.4-mini';
const OPENAI_URL = 'https://api.openai.com/v1/responses';

function toOpenAIContent(content) {
  if (typeof content === 'string') return [{ type: 'input_text', text: content }];
  if (!Array.isArray(content)) return [{ type: 'input_text', text: JSON.stringify(content || '') }];

  return content.map((part) => {
    if (part.type === 'text') return { type: 'input_text', text: part.text || '' };
    if (part.type === 'image' && part.source && part.source.data) {
      const media = part.source.media_type || 'image/jpeg';
      return { type: 'input_image', image_url: `data:${media};base64,${part.source.data}` };
    }
    return { type: 'input_text', text: JSON.stringify(part) };
  });
}

function anthroStyleResponse(text) {
  return { content: [{ type: 'text', text }] };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'Missing OPENAI_API_KEY in Vercel environment variables' });

  try {
    const body = req.body || {};
    const system = body.system || '';
    const firstMsg = Array.isArray(body.messages) ? body.messages[0] : null;
    const userContent = toOpenAIContent(firstMsg ? firstMsg.content : body.input);
    const maxTokens = body.max_tokens || 2500;
    const model = maxTokens <= 1800 ? MODEL_ANALYZE : MODEL_WRITE;

    const openaiPayload = {
      model,
      input: [
        { role: 'system', content: [{ type: 'input_text', text: system }] },
        { role: 'user', content: userContent }
      ],
      max_output_tokens: maxTokens,
      text: { format: { type: 'text' } }
    };

    const r = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(openaiPayload)
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.error || data });

    const text = data.output_text || (data.output || [])
      .flatMap(o => o.content || [])
      .map(c => c.text || '')
      .join('\n');

    return res.status(200).json(anthroStyleResponse(text));
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
};
