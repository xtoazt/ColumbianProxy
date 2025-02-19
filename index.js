const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PROXY = "http://41.203.213.211:8105"; // Proxy IP & Port

app.get("/", (req, res) => {
  res.send(`
    <h2>ColumbianProxy</h2>
    <form action="/proxy" method="get">
      <input type="text" name="url" placeholder="Enter URL" required>
      <button type="submit">Go</button>
    </form>
  `);
});

app.get("/proxy", async (req, res) => {
  let url = req.query.url;
  if (!url.startsWith("http")) url = "http://" + url;

  try {
    const response = await axios.get(url, { proxy: { host: "41.203.213.211", port: 8105 } });
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching the requested page.");
  }
});

// Listen on Vercel
module.exports = app;
