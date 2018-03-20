import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Pair from '../models/pair';

const should = chai.use(chaiHttp).should();

describe('Pairs', () => {

  beforeEach(done => {
    Pair.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for pairs', () => {

    it('should get all the pairs', done => {
      chai.request(app)
        .get('/api/pairs')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get pairs count', done => {
      chai.request(app)
        .get('/api/pairs/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new pair', done => {
      const pair = new Pair({ domainName: 'www.forum.test', username:'stuff', password:'password'});
      chai.request(app)
        .post('/api/pair')
        .send(pair)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('domainName');
          res.body.should.have.a.property('username');
          res.body.should.have.a.property('password');
          done();
        });
    });

    it('should get a pair by its id', done => {
      const pair = new Pair({domainName: 'Pair', username:'test', password:'pass'});
      pair.save((error, newPair) => {
        chai.request(app)
          .get(`/api/pair/${newPair.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('domainName');
            res.body.should.have.property('username');
            res.body.should.have.property('password');
            res.body.should.have.property('_id').eql(newPair.id);
            done();
          });
      });
    });

    it('should update a pair by its id', done => {
      const pair = new Pair({domainName: 'Pair', username:'test', password:'pass'});
      pair.save((error, newPair) => {
        chai.request(app)
          .put(`/api/pair/${newPair.id}`)
          .send({ username: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a pair by its id', done => {
      const pair = new Pair({domainName: 'Pair', username:'test', password:'pass'});
      pair.save((error, newPair) => {
        chai.request(app)
          .delete(`/api/pair/${newPair.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});
