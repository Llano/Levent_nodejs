var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var connection = null;
var url = "localhost";
var user = "username";
var pw = "password";

for(var i=2; i<process.argv.length; i++) {
  console.log(process.argv[i]);
  if(process.argv[i].startsWith("--")) {
    var name = process.argv[i].slice(2).split("=")[0].toUpperCase();
    switch(name) {
      case "PORT":
        if(process.argv[i].split("=").length !== 2) break;
        port = parseInt(process.argv[i].split("=")[1]);
        break;
      case "USER":
        if(process.argv[i].split("=").length !== 2) break;
        user = process.argv[i].split("=")[1];
        break;
      case "PASSWORD":
        if(process.argv[i].split("=").length !== 2) break;
        pw = process.argv[i].split("=")[1];
        break;
      case "DB":
        if(process.argv[i].split("=").length !== 2) break;
        url = process.argv[i].split("=")[1];
        break;
      default:
        console.log("Unknown flag \""+name+"\"")
    }
  }
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
