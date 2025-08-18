CanNews backend proxy for Render

Instructions:
1. Deploy this folder to Render as a new Web Service (Static/Node).
2. Set environment variable: NEWSAPI_KEY (your NewsAPI API key).
3. Start command: node server.js
4. Default port: 8787 (Render will map external port automatically).

Endpoints:
- GET /health  -> basic health check
- GET /api/news -> fetches Canada top-headlines. Optional query: ?category=business&pageSize=20

Notes on usage:
- This proxy keeps the NEWSAPI key server-side so it is not exposed to clients.
- Respect NewsAPI terms of service when caching and rate-limiting.
