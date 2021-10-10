require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

let refreshTokens = [];

app.post('/token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  if (!refreshTokens.includes(token)) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  })
});

app.post('/login', (req, res) => {
  // TODO: Authorize user

  const { username } = req.body;
  const user = {
    name: username,
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens = [...refreshTokens, refreshToken];

  res.json({ accessToken, refreshToken });
});

app.delete('/logout', (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  refreshTokens = refreshTokens.filter(t => t !== token);
  res.sendStatus(204);
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

app.listen(4000);