import Domain from '../models/domain';
import Pair from '../models/pair';
import BaseCtrl from './base';

export default class DomainCtrl extends BaseCtrl {
  model = Domain;

  delete = (req, res) => {
    console.log(req.params.id);
    Pair.remove({ domainID: req.params.id });
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }
}
