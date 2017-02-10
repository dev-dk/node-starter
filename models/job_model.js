var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var promise = require('bluebird');
promise.promisifyAll(mongoose);

var job_index = Schema({
    date:Date,
    user_id: String,
    name: String,
    status: String,
    result: String
}, {collection: 'job_collection'});
promise.promisifyAll(mongoose);
mongoose.Promise = global.Promise;
var db = mongoose.createConnection('mongodb://krishna:anhsirk@ds139939.mlab.com:39939/job_db');
module.exports = db.model('job_collection', job_index);