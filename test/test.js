const request = require('supertest');
const should = require('should');
const app = require('../app');

describe('index', () => {
  describe('GET /', () => {
    it('should return main page', (done) => {
      request(app)
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
});
