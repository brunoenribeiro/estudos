const andRestrictsRole = (role) => (req, res, next) => {
  if (req.authenticatedUser.role === role) {
    next();
  } else {
    next(new Error('Unauthorized'));
  }
}

module.exports = andRestrictsRole;
