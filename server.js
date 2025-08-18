import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Make sure node-fetch is installed

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("News Aggregator Backend is running!");
});

// Example API route to fetch news
app.get("/api/news", async (req, res) => {
  const NEWS_API_KEY = process.env.NEWS_API_KEY; // Store your key in Render environment variables
  const { category = "general", country = "ca" } = req.query;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
