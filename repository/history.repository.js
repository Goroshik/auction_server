/* eslint-disable no-undef */
const { History } = require('../models');

class HistoryRepository {
  constructor() {
    this.history = History;
  }

  getAll(filterParams) {
    return this.history.findAll(filterParams);
  }

  add(historyData) {
    return this.history.create(historyData);
  }

  delete(historyId) {
    return this.history.destroy({ where: { id: historyId } })
      .then(() => ({ deleted: true }));
  }

}

module.exports = new HistoryRepository();
