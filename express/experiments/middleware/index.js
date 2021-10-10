const express = require('express');
const path = require('path');
const { loadUser, andRestrictsToSelf, andRestrictsRole } = require('./middleware');

const app = express();
const port = 3000;

const users = [
  { id: '0', name: 'Bruno', role: 'admin' },
  { id: '1', name: 'Isadora', role: 'admin' },
  { id: '2', name: 'Jon Snow', role: 'viewer' },
];

app.use(express.json());

// Just for testing
app.use((req, res, next) => {
  req.authenticatedUser = users[0];
  next();
});

app.get('/users/:id', loadUser(users), (req, res) => {
  res.json(req.user);
});

app.put('/users/:id', loadUser(users), andRestrictsToSelf, (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.user.id);
  
  if (userIndex > -1) {
    users[userIndex] = { ...req.user, ...req.body };
    res.status(204).json(users[userIndex]);
  } else {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`Listening at http//localhost:${port}`);
})