module.exports = {
  JWT_EXPIRES_IN: '7d',
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: 100, // limit each IP to 100 requests per windowMs
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2
}; 