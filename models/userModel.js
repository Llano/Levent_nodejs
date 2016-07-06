var database = require('./dbModel');

var validateUser = function(username, password, callback) {
    database.getConnection().collection('users').findOne({username: username, password: password}, function(err, document) {
        callback(document);
    });
}

module.exports = {
    validateUser: validateUser
}
