var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var connection = null;
var utilities = require('../helpers/utilities');

var args = utilities.parseArguments();
var url = "localhost";
var user = "username";
var pw = "password";
if(args["USER"] != null) {
    user = args["USER"];
}
if(args["PW"] != null) {
    pw = args["PW"];
}
if(args["DB"] != null) {
    url = args["DB"];
}


MongoClient.connect("mongodb://"+url+":27017/levent", function(err, db) {
    db.admin().authenticate(user, pw, function(err, res) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        db.collection('events').ensureIndex({"location": "2dsphere"});
        connection = db;
    });
});

exports.getConnection = function() {
    return connection;
}
