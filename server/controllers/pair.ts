import Pair from '../models/pair';
import BaseCtrl from './base';

export default class PairCtrl extends BaseCtrl {
  model = Pair;

  deleteMany = (req, res) => {
    this.model.deleteMany({ domainID: req.params.domainID }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }
}
