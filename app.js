const express = require('express');
const apiRouter = require('./routes/api');
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})

module.exports = app;
