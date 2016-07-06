var userModel = require('../models/userModel');
var tokenModel = require('../models/tokenModel');
module.exports = function(router) {


    router.get('/token', function(req, res) {
        res.sendStatus(404);
    });

    router.post('/token', function(req, res) {
        userModel.validateUser('Zacharias', 'herpderp', function(item) {
            if(!item)
            {
                res.sendStatus(403)
            }
            else {
                tokenModel.generateToken({user_id: item._id}, function(token) {
                    res.json({token: token});
                });
            }
        });
    });
}
