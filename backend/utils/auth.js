const jwt = require('jsonwebtoken');

// Generate JWT Token
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Send token response
exports.sendTokenResponse = (user, statusCode, res) => {
  const token = this.generateToken(user._id);
  
  const userData = {
    _id: user._id,
    email: user.email,
    role: user.role,
    profile: user.profile,
    pregnancyInfo: user.pregnancyInfo
  };
  
  res.status(statusCode).json({
    success: true,
    token,
    user: userData
  });
};
