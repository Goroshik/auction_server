const { Users } = require('../models');

class UsersRepository {
  constructor() {
    this.users = Users;
    this.attributes = ['id', 'firstName', 'lastName', 'email'];
  }

  getAll() {
    return this.users.findAll({ attributes: this.attributes });
  }

  get(userID) {
    return this.users.findOne({
      where: { id: userID },
      attributes: this.attributes
    });
  }

  add(userData) {
    return this.users.create(userData)
      .then(res => ({ id: res.id }));
  }

  update(userData) {
    return this.users.update(
      userData,
      { where: { id: userData.id } })
      .then(() => this.get(userData.id));
  }

  delete(userID) {
    return this.users.destroy({ where: { id: userID } })
      .then(() => ({ id: Number(userID), deleted: true }));
  }

  getAuthorizationData(userData) {
    const attributes = ['id', 'email', 'password', 'salt', 'firstName', 'lastName'];

    return this.users.findOne({
      where: { email: userData.email },
      attributes: attributes
    });
  }

}

module.exports = new UsersRepository();
