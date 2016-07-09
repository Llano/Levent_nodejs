var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://94.255.142.118:27017/levent';
var connection = null;

MongoClient.connect(url, function(err, db) {
    db.admin().authenticate("username", "password", function(err, res) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        db.collection('events').ensureIndex({"location": "2dsphere"});
        connection = db;
    });


});

exports.getConnection = function() {
    return connection;
}
