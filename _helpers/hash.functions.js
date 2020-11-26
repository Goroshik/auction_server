const crypto = require('crypto');

const { secret } = require('../config/jwt.config');

class Hash {
  constructor() {
    this.saltLength = 16;
    this.salt = this.generateSalt();
    this.secret = secret;
  }

  hashPassword(password, salt = this.salt) {
    const hashPassword = this.hash(password);

    return {
      password: this.hash(hashPassword + salt),
      salt: salt
    };
  }

  hash(dataForHashing) {
    return crypto.createHmac('sha256', this.secret)
      .update(dataForHashing)
      .digest('hex');
  }

  generateSalt() {
    return crypto.randomBytes(Math.ceil(this.saltLength / 2))
      .toString('hex')
      .slice(0, this.saltLength);
  }

}

module.exports = Hash;
