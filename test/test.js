const request = require('supertest');

const server = require('../app');

let describe;
let it;

describe('index', () => {
  describe('GET /', () => {
    it('should return a homepage', (done) => {
      request(server)
        .get('/')
        .expect('Content-type', 'text/html; charset=utf-8')
        .expect(200)
        .end((err, res) => {
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
    .end((err, res) => {
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
  it('should return registration page', (done) => {
    request(server)
    .get('/')
    .expect('Content-type', 'text/html; charset=utf-8')
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(200);
        done();
      }
    });
  });
});

describe('GET /home', () => {
  it('return home page', (done) => {
    request(server)
    .get('/home')
    .expect('Content-type', 'text/html; charset=utf-8')
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(200);
        done();
      }
    });
  });
});

describe('GET /profile', () => {
  it(' return profile page', (done) => {
    request(server)
    .get('/profile')
    .expect('Content-type', 'text/html; charset=utf-8')
    .expect(200)
    .end((err, res) => {
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
  it('user can register', (done) => {
    const registration = {
      username: 'abc',
      email: 'abc@gmail.com',
      password: 'password',
    };
    request(server)
      .post('/registration')
      .send(registration)
      .expect(200)
      .expect({})
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(200);
          done();
        }
      });
  });
});

describe('POST /login', () => {
  it('user can register', (done) => {
    const registration = {
      email: 'abc@gmail.com',
      password: 'password',
    };
    request(server)
      .post('/login')
      .send(registration)
      .expect(302)
      .expect({})
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});

describe('POST /twit', () => {
  it('user can tweet', (done) => {
    const tw = {
      tweet_text : 'hello',
    };
    request(server)
      .post('/twit')
      .send(tw)
      .expect(302)
      .expect({})
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});

