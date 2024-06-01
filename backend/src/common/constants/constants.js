/**
 * constant.js
 * @description :: constants
 */

module.exports = {
  BCRYPT: {
    SALT_ROUND: 12,
  },
  JWT: {
    SECRET: process.env.SECRETKEY,
    EXPIRES_IN: "1 YEAR",
  },
};
