let request = require('supertest');

// const server = require('../app');
request = request('http://localhost:3000');
const should = require('should');

describe('index', () => {
  describe('GET /', () => {
    it('should return a indexpage', (done) => {
      request
        .get('/')
        .expect('Content-type', 'text/html; charset=utf-8')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          res.status.should.be.equal(200);
          done();
        });
    });
  });
});

describe('GET /login', () => {
  it('should return login page', (done) => {
    request
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
    request
    .get('/registration')
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
    request
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
    request
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
    request
      .post('/registration')
      .send(registration)
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
    const login = {
      email: 'abc@gmail.com',
      password: '123',
    };
    request
      .post('/login')
      .send(login)
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
    request
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
      tweet_text: 'hello',
      user_id: '222',
    };
    request
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
      request
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
    request
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

describe('profile', () => {
  describe('GET /editprofile', () => {
    it('should return a update profile photo page', (done) => {
      request
        .get('/editprofile')
        .expect('Content-type', 'text/html; charset=utf-8')
        .expect(200)
        .end((err, res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });
});

describe('POST /editprofile', () => {
  it('user can edit their profile photo', (done) => {
    const editprofile = {
      image: 'sun.jpg',

    };
    request
      .post('/editprofile')
      .send(editprofile)
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
    request
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
    request
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
    request
      .get('/logout')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(302)
      .end((err, res) => {
        res.status.should.be.equal(302);
        done();
      });
  });
});
