const chai = require('chai');
const chaiHttp = require('chai-http');
require('chai').should();
chai.use(chaiHttp);

const { app } = require('../../index');
const { user } = require('../../tests.data');

let userID = 0;
let sessionToken = '';

describe('users routes tests', () => {
  beforeEach('create user and get sessionToken', () => {
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
      });
  });

  afterEach('delete user', () => {
    return chai.request(app)
      .delete(`/users/${userID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .then(() => {});
  });

  it('should add user', done => {
    chai.request(app)
      .post('/users/')
      .set('authorization', 'Bearer ' + sessionToken)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('id');
        res.body.id.should.be.a('number');

        done();
      });
  });

  it('should get user by id', done => {
    chai.request(app)
      .get(`/users/${userID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('id');
        res.body.should.have.property('email');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.id.should.be.a('number');
        res.body.email.should.be.a('string');
        res.body.firstName.should.be.a('string');
        res.body.lastName.should.be.a('string');
        res.body.email.should.equal(user.email);
        res.body.firstName.should.equal(user.firstName);
        res.body.lastName.should.equal(user.lastName);

        done();
      });
  });

  it('should update user by id', done => {
    const newUserData = { 'firstName': 'alex123' };

    chai.request(app)
      .put(`/users/${userID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .send(newUserData)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('id');
        res.body.should.have.property('email');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.id.should.be.a('number');
        res.body.email.should.be.a('string');
        res.body.firstName.should.be.a('string');
        res.body.lastName.should.be.a('string');
        res.body.id.should.equal(userID);
        res.body.email.should.equal(user.email);
        res.body.firstName.should.equal(newUserData.firstName);
        res.body.lastName.should.equal(user.lastName);

        done();
      });
  });

  it('should delete user by id', done => {
    chai.request(app)
      .delete(`/users/${userID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('id');
        res.body.should.have.property('deleted');
        res.body.id.should.be.a('number');
        res.body.id.should.equal(userID);
        res.body.deleted.should.equal(true);

        done();
      });
  });

});
