const loadUser = (users) => (req, res, next) => {
  const user = users[req.params.id];
  if (user) {
    req.user = user;
    next();
  } else {
    next(new Error(`Failed to load user with id: ${req.params.id}`));
  }
}

module.exports = loadUser;
