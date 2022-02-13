const express = require('express');
const generalRouter = require('./routes/general');
const postsRouter = require('./routes/blogPosts');
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.use('/api', generalRouter);
app.use('/api/posts', postsRouter);

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${port}`);
})

module.exports = app;
