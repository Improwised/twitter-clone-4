const should = require('should');
const request = require('supertest');
const server = require('../app');

describe('index', function() {
  describe('GET /', function() {
    it('should return a homepage', function(done) {
      request(server)
        .get('/')
        .expect('Content-type', 'text/html; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          res.status.should.be.equal(200);
          done();
        });
    });
  });
});

describe('GET /login', () => {
  it('should return login page', (done) => {
    request(server)
    .get('/login')
    .expect('Content-type', 'text/html; charset=utf-8')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(200);
        done();
      }
    });
  });
});

describe('GET /registration', () => {
  it('should return login page', (done) => {
    request(server)
    .get('/')
    .expect('Content-type', 'text/html; charset=utf-8')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(200);
        done();
      }
    });
  });
});

describe('POST /registration', () => {
  it('user can register', function (done) {
    var registration = {
      username: 'abc',
      email: 'abc@gmail.com',
      password: 'password'
    };
    // Required Filed testing
    // registration.should.have.property('username');
    // registration.username.should.be.type('string');



    // Non required filed testing
    if (registration.username) {
      registration.username.should.be.type('string');
    }
    request(server)
      .post('/registration')
      .send(registration)
      .expect(302)
      .expect({})
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});

describe('POST /login', () => {
  it('user can register', function (done) {
    var registration = {
      email: 'abc@gmail.com',
      password: 'password'
    };
    // Required Filed testing
    // registration.should.have.property('email');
    // registration.email.should.be.type('string');

    // Non required filed testing
    if (registration.email) {
      registration.email.should.be.type('string');
    }
    request(server)
      .post('/login')
      .send(registration)
      .expect(302)
      .expect({})
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});

