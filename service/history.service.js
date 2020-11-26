const HistoryRepository = require('../repository/history.repository');
const AuthService = require('./auth.service');
const parsingQueryString = require('../_helpers/parsingQueryString');

class HistoryService {
  constructor() {
    this.historyRepository = HistoryRepository;
    this.authService = AuthService;
  }

  getAll(query) {
    const filterParams = parsingQueryString(query);

    return this.historyRepository.getAll(filterParams);
  }

  add(historyData, token) {
    const userID = this.authService.parsToken(token).id;
    const history = {
      ...historyData,
      userID,
      dateTime: new Date().toLocaleString()
    };

    return this.historyRepository.add(history);
  }

  delete(historyId) {
    return this.historyRepository.delete(historyId)
      .catch(() => {
        return new Error('History does not exist');
      });
  }

}

module.exports = new HistoryService();
