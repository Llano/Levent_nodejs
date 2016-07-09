var database = require('./dbModel');

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
        "title" : title,
        "location" : coordinates,
        "user_id" : user_id
    }, function(err, result) {
        if(!err)
            callback();
    });
}

module.exports = {
    getEvents: getEvents,
    createEvent: createEvent
}
