import * as mongoose from 'mongoose';

const pairSchema = new mongoose.Schema({

  domainID: String,
  username: String,
  password: String
});

const Pair = mongoose.model('Pair', pairSchema);

export default Pair;
