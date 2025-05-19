const { verifyToken } = require('../authentication/auth');

function authenticate(req, res, next) {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json({ message: 'Token not provided'});
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid token'});
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  next();
}

module.exports = { authenticate, isAdmin };