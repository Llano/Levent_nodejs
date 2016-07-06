var database = require('./dbModel');
var fs = require('fs')
var jwt = require('jsonwebtoken');
var jwtkey = null;
fs.readFile('jwt.key', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  jwtkey = data;

});



var generateToken = function(payload, callback) {
    jwt.sign(payload, jwtkey, { algorithm: 'HS256' }, function(err, token) {
        if(!err)
            callback(token);
    });
}

var verifyToken = function(req, res, next) {
    jwt.verify(req.get('Authorization'), jwtkey, function(err, decoded) {
        if (!err) {
            return next();

        }
        res.sendStatus(401);


    });
}

module.exports = {
    verifyToken: verifyToken,
    generateToken: generateToken
}
