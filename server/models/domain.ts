import * as mongoose from 'mongoose';

const domainSchema = new mongoose.Schema({

  user: String,
  domainName: String
});

const Domain = mongoose.model('Domain', domainSchema);

export default Domain;
