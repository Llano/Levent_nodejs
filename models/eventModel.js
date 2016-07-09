var database = require('./dbModel');
var ObjectId = require('mongodb').ObjectId;

var getEvents = function(coordinates, maxDistance, callback) {

    database.getConnection().collection('events').find({"location" : {$near: {$geometry: {type: "Point", coordinates: coordinates}, $maxDistance: maxDistance}}}).toArray(function(err, document) {
        if(err) {
            console.log(err);
        }
        callback(document);
    });


}

var createEvent = function(coordinates, title, user_id, callback) {
    database.getConnection().collection('events').insertOne({
        title : title,
        location : {
            type : "Point",
            coordinates : coordinates
        },
        user_id : ObjectId(user_id),
        date: Date.now()
    }, function(err, result) {
        if(!err)
            callback();
    });
}

module.exports = {
    getEvents: getEvents,
    createEvent: createEvent
}
