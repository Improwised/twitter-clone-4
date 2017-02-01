const should = require('should');
const request = require('supertest');
const server = require('../app');

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
  it('should return login page', (done) => {
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
      password: '243',
      image: 'sun.jpg',
    };
    request(server)
      .post('/registration')
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

describe('POST /login', () => {
  it('user can register', (done) => {
    const registration = {
      email: 'abc@gmail.com',
      password: '123'
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

describe('GET /twit', () => {
  it('should return a edit profile page', (done) => {
    request(server)
      .get('/twit')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
});

describe('POST /twit', () => {
  it('user can tweet', (done) => {
    const tw = {
      tweetText: 'hello',
      user_id: '222',

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

describe('profile', () => {
  describe('GET /edit', () => {
    it('should return a edit profile page', (done) => {
      request(server)
        .get('/edit')
        .expect('Content-type', 'text/html; charset=utf-8')
        .expect(200)
        .end((err, res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });
});
describe('POST /edit', () => {
  it('user can edit their profile', (done) => {
    const edit = {
      username: 'abcd',
      email: 'abcd@gmail.com',
      password: '123',

    };
    request(server)
      .post('/edit')
      .send(edit)
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
describe('POST /follow', () => {
  it('user can follow other user', (done) => {
    const follower = {
      login_user: '1',
      follower_id: '12',

    };
    request(server)
      .post('/follow')
      .send(follower)
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
describe('POST /unfollow', () => {
  it('user can follow other user', (done) => {
    const unfollower = {
      id_f: '12',
    };
    request(server)
      .post('/unfollow')
      .send(unfollower)
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
describe('GET /logout', () => {
  it('should return a main index page', (done) => {
    request(server)
      .get('/logout')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(302)
      .end((err, res) => {
        res.status.should.be.equal(302);
        done();
      });
  });
});
