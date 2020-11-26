const UsersRepository = require('../repository/users.repository');
const AuthService = require('./auth.service');

const Hash = require('../_helpers/hash.functions');

class UsersService {
  constructor() {
    this.usersRepository = UsersRepository;
    this.authService = AuthService;
  }

  getAll() {
    return this.usersRepository.getAll();
  }

  add(userData) {
    const hash = new Hash();

    const { password, salt } = hash.hashPassword(userData.password);
    const newUser = {
      ...userData,
      password: password,
      salt: salt
    };

    return this.usersRepository.add(newUser);
  }

  get(userID) {
    return this.usersRepository.get(userID)
      .then(user => {
        if (user === null) {
          return new Error();
        }

        return user;
      })
      .catch(() => new Error('User not found!'));
  }

  getByToken(token) {
    const userID = this.authService.parsToken(token).id;

    return this.get(userID);
  }

  update(token, user) {
    const userData = {
      ...user,
      id: this.authService.parsToken(token).id
    };

    return this.usersRepository.update(userData)
      .then(res => {
        if (!res) {
          throw new Error();
        }

        return res;
      })
      .catch(() => {
        return new Error('User does not update');
      });
  }

  delete(userID) {
    return this.usersRepository.delete(userID)
      .catch(() => {
        return new Error('User does not exist');
      });
  }

}

module.exports = new UsersService();
