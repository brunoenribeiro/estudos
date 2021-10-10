const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.post('/', (req, res) => {
  res.send('Received a post request');
});

app.put('/', (req, res) => {
  res.send('Received a put request');
});

app.delete('/', (req, res) => {
  res.send('Received a delete request');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
