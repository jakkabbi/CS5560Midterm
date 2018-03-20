import * as express from 'express';

import DomainCtrl from './controllers/domain';
import PairCtrl from './controllers/pair';
import UserCtrl from './controllers/user';
import Domain from './models/domain';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const domainCtrl = new DomainCtrl();
  const pairCtrl = new PairCtrl();
  const userCtrl = new UserCtrl();

  // Domains
  router.route('/domains').get(domainCtrl.getAll);
  router.route('/domains/count').get(domainCtrl.count);
  router.route('/domain').post(domainCtrl.insert);
  router.route('/domain/:id').get(domainCtrl.get);
  router.route('/domain/:id').put(domainCtrl.update);
  router.route('/domain/:id').delete(domainCtrl.delete);

  // Pairs
  router.route('/pairs').get(pairCtrl.getAll);
  router.route('/pairs/count').get(pairCtrl.count);
  router.route('/pair').post(pairCtrl.insert);
  router.route('/pair/:id').get(pairCtrl.get);
  router.route('/pair/:id').put(pairCtrl.update);
  router.route('/pair/:id').delete(pairCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our applidomainion with the prefix /api
  app.use('/api', router);

}
