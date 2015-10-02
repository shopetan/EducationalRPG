var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problem = new Schema({
  subject_code         : {type: Number},
  small_classification : {type: Number},
  difficulty           : {type: Number},
  istwochioseQuestion  : { type: Boolean},
  question             : { type: Text},
  chiose0              : { type: Text},
  chiose1              : { type: Text},
  chiose2              : { type: Text},
  chiose3              : { type: Text},
  anwser                : { type: Number},
  ImagePATH            : { type: String }
}, {
  // define this collection's name explicitly
  collection: "problems"
});

module.exports = mongoose.model('Problem', Problem);
