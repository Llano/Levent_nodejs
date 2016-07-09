var tokenModel = require('../models/tokenModel');
var eventModel = require('../models/eventModel');
module.exports = function(router) {

    router.get('/event', tokenModel.verifyToken, function(req, res) {
        var geo = [
            20.26304,
            63.82585
        ];
        var maxDistance = 10000; //max distance in meter
        eventModel.getEvents(geo, maxDistance, function(data) {
            res.json({"events" : data});
        })
    });

    router.post('/event', tokenModel.verifyToken, function(req, res) {
        if(!req.body) return res.sendStatus(400);
        eventModel.createEvent([20.26304,63.82585], "test title", "1", function() {
            res.json({"status" : "success"});
        })
    });
}
