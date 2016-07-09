var userModel = require('../models/userModel');
var tokenModel = require('../models/tokenModel');
module.exports = function(router) {


    router.get('/token', function(req, res) {
        res.sendStatus(404);
    });

    router.post('/token', function(req, res) {
        if(!req.body) return res.sendStatus(400);
        userModel.validateUser(req.body.username, req.body.password, function(item) {
            if(!item)
            {
                res.sendStatus(400);
            }
            else {
                tokenModel.generateToken({user_id: item._id}, function(token) {
                    res.json({token: token});
                });
            }
        });
    });
}
