const { verifyToken } = require('../authentication/auth');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if(!token) {
    return res.status(401).json({ message: 'Token not provided'});
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error){
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