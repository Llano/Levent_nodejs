var tokenModel = require('../models/tokenModel');
var eventModel = require('../models/eventModel');
var utilities = require('../helpers/utilities');
module.exports = function(router) {

    router.get('/event', tokenModel.verifyToken, function(req, res) {
        var maxDistance = 20 * 1000; //km
        eventModel.getEvents(utilities.parseHeaderCoordinates(req.get("coordinates")), maxDistance, function(data) {
            res.json({"events" : data});
        })
    });

    router.post('/event', tokenModel.verifyToken, function(req, res) {
        if(!req.body.title) return res.sendStatus(400);

        eventModel.createEvent(utilities.parseHeaderCoordinates(req.get("coordinates")), req.body.title, req.payload.user_id, function() {
            res.json({"status" : "success"});
        })
    });
}
