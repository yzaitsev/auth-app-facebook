const mongoose = require('mongoose');
const config = require('config');
const uniqueValidator = require('mongoose-beautiful-unique-validation');


mongoose.set('debug', true);
mongoose.plugin(uniqueValidator);
mongoose.connect(config.get('mongodb.uri'));

module.exports = mongoose;

