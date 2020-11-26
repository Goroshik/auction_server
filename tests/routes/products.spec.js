const chai = require('chai');
const chaiHttp = require('chai-http');
require('chai').should();
chai.use(chaiHttp);

const { app } = require('../../index');
const { user, product } = require('../../tests.data');

let userID = 0;
let sessionToken = '';

let productID = 0;

describe('products routes tests', () => {
  beforeEach('create user and get sessionToken, then create product', () => {
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
          .post('/products/')
          .set('authorization', 'Bearer ' + sessionToken)
          .send(product);
      })
      .then(res => {
        productID = res.body.id;
      });
  });

  afterEach('delete user and product', () => {
    return chai.request(app)
      .delete(`/users/${userID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .then(() => {
        return chai.request(app)
          .delete(`/products/${productID}`)
          .set('authorization', 'Bearer ' + sessionToken);
      });
  });

  it('should add product', done => {
    chai.request(app)
      .post('/products/')
      .set('authorization', 'Bearer ' + sessionToken)
      .send(product)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('id');
        res.body.id.should.be.a('number');

        done();
      });
  });

  it('should get all products', done => {
    chai.request(app)
      .get('/products/')
      .set('authorization', 'Bearer ' + sessionToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('array');

        done();
      });
  });

  it('should delete product by id', done => {
    chai.request(app)
      .delete(`/products/${productID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('id');
        res.body.should.have.property('deleted');
        res.body.id.should.be.a('number');
        res.body.id.should.equal(productID);
        res.body.deleted.should.equal(true);

        done();
      });
  });

});

