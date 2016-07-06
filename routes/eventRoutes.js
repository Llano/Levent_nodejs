var tokenModel = require('../models/tokenModel');
var eventModel = require('../models/eventModel');
module.exports = function(router) {

    router.get('/event',tokenModel.verifyToken, function(req, res) {
        var geo = [
            20.26304,
            63.82585
        ];
        var maxDistance = 10000; //max distance in meter
        eventModel.getEvents(geo, maxDistance, function(data) {
            console.log(data);
            res.send(data);
        })
    });
}
