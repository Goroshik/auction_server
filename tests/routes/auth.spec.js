const chai = require('chai');
const chaiHttp = require('chai-http');
require('chai').should();
chai.use(chaiHttp);

const { app } = require('../../index');
const { user } = require('../../tests.data');

let userID = 0;
let sessionToken = '';

describe('authorization tests', () => {
  before(() => {
    return chai.request(app)
      .post('/users/')
      .send(user)
      .then(res => {
        userID = res.body.id;
      });
  });

  after(() => {
    return chai.request(app)
      .delete(`/users/${userID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .then(() => {});
  });

  it('should return session token for user', done => {
    chai.request(app)
      .post('/login')
      .send(user)
      .end((err, res) => {
        sessionToken = res.body.token;

        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');
        res.body.should.have.property('token');
        res.body.token.should.be.a('string');

        done();
      });
  });

});
