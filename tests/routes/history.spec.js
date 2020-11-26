const chai = require('chai');
const chaiHttp = require('chai-http');
require('chai').should();
chai.use(chaiHttp);

const { app } = require('../../index');
const { user, history } = require('../../tests.data');

let userID = 0;
let sessionToken = '';

let historyID = 0;

describe('history routes tests', () => {
  beforeEach('create user and get sessionToken, then create history', () => {
    return chai.request(app)
      .post('/users/')
      .send(user)
      .then(res => {
        userID = res.body.id;

        return chai.request(app)
          .post('/login')
          .send(user);
      })
      .then(res => {
        sessionToken = res.body.token;
        return chai.request(app)
          .post('/history/')
          .set('authorization', 'Bearer ' + sessionToken)
          .send(history);
      })
      .then(res => {
        historyID = res.body.id;
      });
  });

  afterEach('delete user and history', () => {
    return chai.request(app)
      .delete(`/users/${userID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .then(() => {
        return chai.request(app)
          .delete(`/history/${historyID}`)
          .set('authorization', 'Bearer ' + sessionToken);
      });
  });

  it('should add history', done => {
    chai.request(app)
      .post('/history/')
      .set('authorization', 'Bearer ' + sessionToken)
      .send(history)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('id');
        res.body.id.should.be.a('number');

        done();
      });
  });

  it('should get all history', done => {
    chai.request(app)
      .get('/history/')
      .set('authorization', 'Bearer ' + sessionToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('array');

        done();
      });
  });

  it('should filter history by productID', done => {
    const params = {
      productID: history.productID
    };

    chai.request(app)
      .get('/history/')
      .set('authorization', 'Bearer ' + sessionToken)
      .query(params)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('array');

        done();
      });
  });

  it('should delete history by id', done => {
    chai.request(app)
      .delete(`/history/${historyID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('deleted');
        res.body.deleted.should.equal(true);

        done();
      });
  });

});

