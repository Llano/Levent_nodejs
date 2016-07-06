var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/levent';
var connection = null;

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db.collection('events').ensureIndex({"location": "2dsphere"});
    connection = db;

});

exports.getConnection = function() {
    return connection;
}
