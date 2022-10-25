const express = require("express");
const app = express();

const cors = require("cors");

const port = process.envPORT || 5000;

app.use(cors());

const categories = require("./data/categories.json");
const news = require("./data/news.json");

app.get("/", (req, res) => {
  res.send("News API Running");
});

app.get("/news-categories", (req, res) => {
  res.send(categories);
});

app.get("/categories/:id", (req, res) => {
  const id = req.params.id;
  if (id == "08") {
    res.send(news);
  } else {
    // filter karon eki rokom onk news._id ache
    const category_news = news.filter((news) => news.category_id === id);
    res.send(category_news);
  }
});
app.get("/news", (req, res) => {
  res.send(news);
});

app.get("/news/:id", (req, res) => {
  const id = req.params.id;
  // find karon id holo uniqe
  const selectedNews = news.find((n) => n._id === id);
  res.send(selectedNews);
});

app.listen(port, () => {
  console.log("Dragon News Server Running On Port", port);
});
