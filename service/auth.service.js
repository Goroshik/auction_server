const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config');
const atob = require('atob');

const Hash = require('../_helpers/hash.functions');
const UsersRepository = require('../repository/users.repository');

class AuthorizationService {
  constructor() {
    this.usersRepository = UsersRepository;
    this.hash = new Hash();
  }

  getUser(userData) {
    return this.usersRepository.getAuthorizationData(userData);
  }

  async login(userData) {
    try {
      const userPassword = userData.password;

      const userFromDB = await this.getUser(userData);
      const hashData = this.hash.hashPassword(userPassword, userFromDB.salt);

      if (userFromDB.password !== hashData.password) {
        throw new Error();
      }

      const userDataForToken = {
        id: userFromDB.id,
        email: userFromDB.email,
        firstName: userFromDB.firstName,
        lastName: userFromDB.lastName,
      };

      const token = await this.getToken(userDataForToken);

      return { token: token, id: userFromDB.id };
    } catch (error) {
      return new Error('Invalid password or email');
    }
  }

  getToken(userData) {
    return jwt.sign(userData, config.secret, { algorithm: 'HS256' });
  }

  verifyUser(token) {
    const { secret } = config;
    return jwt.verify(token, secret, function (err, payload) {
      if (err) {
        throw new Error(err);
      }

      return payload;
    });
  }

  parsToken(barearToken) {
    const token = barearToken.split(' ')[1];
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

}

module.exports = new AuthorizationService();
