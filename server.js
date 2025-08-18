import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fetch from 'node-fetch';

const app = express();
app.use(helmet());
app.use(cors());

const PORT = process.env.PORT || 8787;
const API_KEY = process.env.NEWSAPI_KEY || '';

if (!API_KEY) {
  console.warn('WARNING: NEWSAPI_KEY is not set. Endpoint will return upstream errors until it is configured.');
}

const BASE = 'https://newsapi.org/v2/top-headlines';

function toCard(a){
  return {
    title: a.title,
    description: a.description,
    url: a.url,
    urlToImage: a.urlToImage,
    publishedAt: a.publishedAt,
    source: a.source
  };
}

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/api/news', async (req, res) => {
  try {
    const category = req.query.category ? `&category=${encodeURIComponent(req.query.category)}` : '';
    const pageSize = req.query.pageSize || 50;
    const url = `${BASE}?country=ca${category}&pageSize=${pageSize}`;
    const r = await fetch(url, { headers: { 'X-Api-Key': API_KEY } });
    if (!r.ok) {
      const text = await r.text();
      return res.status(r.status).json({ error: 'Upstream error', status: r.status, detail: text });
    }
    const data = await r.json();
    const articles = Array.isArray(data.articles) ? data.articles.map(toCard) : [];
    res.json({ articles });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`CanNews proxy running on :${PORT}`));
