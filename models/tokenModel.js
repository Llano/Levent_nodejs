var database = require('./dbModel');
var fs = require('fs')
var assert = require('assert');
var jwt = require('jsonwebtoken');
var jwtkey = null;
fs.readFile('jwt.key', 'utf8', function (err,data) {
  assert.equal(null, err);

  jwtkey = data;

});



var generateToken = function(payload, callback) {
    jwt.sign(payload, jwtkey, { algorithm: 'HS256' }, function(err, token) {
        if(!err)
            callback(token);
    });
}

var verifyToken = function(req, res, next) {
    if(req.get('Authorization') == null){ return res.status(403).json({"error" : "no token"})}
    jwt.verify(req.get('Authorization'), jwtkey, function(err, decoded) {
        if (!err) {
            req.payload = decoded;
            next();

        }else {
            res.status(401).json({"error" : "invalid token"});
        }




    });
}


module.exports = {
    verifyToken: verifyToken,
    generateToken: generateToken
}
