import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Domain from '../models/domain';

const should = chai.use(chaiHttp).should();

describe('Domains', () => {

  beforeEach(done => {
    Domain.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for domains', () => {

    it('should get all the domains', done => {
      chai.request(app)
        .get('/api/domains')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get domains count', done => {
      chai.request(app)
        .get('/api/domains/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new domain', done => {
      const domain = new Domain({user: 'test', domainName: 'www.forum.test'});
      chai.request(app)
        .post('/api/domain')
        .send(domain)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('domainName');
          res.body.should.have.a.property('domainUsername');
          res.body.should.have.a.property('domainPassword');
          done();
        });
    });

    it('should get a domain by its id', done => {
      const domain = new Domain({user: 'test', domainName: 'Domain'});
      domain.save((error, newDomain) => {
        chai.request(app)
          .get(`/api/domain/${newDomain.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('domainName');
            res.body.should.have.property('domainUsername');
            res.body.should.have.property('domainPassword');
            res.body.should.have.property('_id').eql(newDomain.id);
            done();
          });
      });
    });

    it('should update a domain by its id', done => {
      const domain = new Domain({user: 'test', domainName: 'Domain'});
      domain.save((error, newDomain) => {
        chai.request(app)
          .put(`/api/domain/${newDomain.id}`)
          .send({ domainUsername: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a domain by its id', done => {
      const domain = new Domain({user: 'test', domainName: 'Domain'});
      domain.save((error, newDomain) => {
        chai.request(app)
          .delete(`/api/domain/${newDomain.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});
