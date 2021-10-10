const andRestrictsToSelf = (req, res, next) => {
  if (req.authenticatedUser.id === req.user.id) {
    next();
  } else {
    next(new Error('Unauthorized'));
  }
}

module.exports = andRestrictsToSelf;