require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const posts = [
  {
    username: 'Foo',
    title: 'Post 1',
  },
  {
    username: 'Foo',
    title: 'Post 2',
  },
];

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name ));
});

function authenticateToken(req, res, next) {
  console.log('Authenticating token...');

  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    req.user = user;
    next();
  })
}

app.listen(3000);