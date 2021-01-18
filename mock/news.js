const getNews = (req, res) => {
  res.json([1, 2, 3]);
};

export default {
  'GET /api/news': getNews,
};
