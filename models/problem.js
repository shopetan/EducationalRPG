var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Problem = new Schema({
  subject_code         : {type: Number},
  small_classification : {type: Number},
  difficulty           : {type: Number},
  istwochioseQuestion  : { type: Boolean},
  question             : { type: String},
  chiose0              : { type: String},
  chiose1              : { type: String},
  chiose2              : { type: String},
  chiose3              : { type: String},
  anwser                : { type: Number},
  ImagePATH            : { type: String }
}, {
  // define this collection's name explicitly
  collection: "problems"
});

module.exports = mongoose.model('Problem', Problem);
