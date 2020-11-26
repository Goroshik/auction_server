const chai = require('chai');
const chaiHttp = require('chai-http');
require('chai').should();
chai.use(chaiHttp);

const { app } = require('../../index');
const { user, category } = require('../../tests.data');

let userID = 0;
let sessionToken = '';

let categoryID = 0;

describe('categories routes tests', () => {
  beforeEach('create user and get sessionToken, then create categories', () => {
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
          .post('/categories/')
          .set('authorization', 'Bearer ' + sessionToken)
          .send(category);
      })
      .then(res => {
        categoryID = res.body.id;
      });
  });

  afterEach('delete user and category', () => {
    return chai.request(app)
      .delete(`/users/${userID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .then(() => {
        return chai.request(app)
          .delete(`/categories/${categoryID}`)
          .set('authorization', 'Bearer ' + sessionToken);
      });
  });

  it('should add categories', done => {
    chai.request(app)
      .post('/categories/')
      .set('authorization', 'Bearer ' + sessionToken)
      .send(category)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('id');
        res.body.id.should.be.a('number');

        done();
      });
  });

  it('should get categories', done => {
    chai.request(app)
      .get('/categories/')
      .set('authorization', 'Bearer ' + sessionToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('array');

        done();
      });
  });

  it('should update category by id', done => {
    const newCategory = { category: 'some category too' };

    chai.request(app)
      .put(`/categories/${categoryID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .send(newCategory)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('id');
        res.body.should.have.property('category');
        res.body.id.should.be.a('number');
        res.body.category.should.be.a('string');
        res.body.id.should.equal(categoryID);
        res.body.category.should.equal(newCategory.category);

        done();
      });
  });

  it('should delete category by id', done => {
    chai.request(app)
      .delete(`/categories/${categoryID}`)
      .set('authorization', 'Bearer ' + sessionToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.property('body');
        res.body.should.be.an('object');

        res.body.should.have.property('id');
        res.body.should.have.property('deleted');
        res.body.id.should.be.a('number');
        res.body.id.should.equal(categoryID);
        res.body.deleted.should.equal(true);

        done();
      });
  });

});

