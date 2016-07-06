var database = require('./dbModel');

var getEvents = function(coordinates, maxDistance, callback) {

    database.getConnection().collection('events').find({"location" : {$near: {$geometry: {type: "Point", coordinates: coordinates}, $maxDistance: maxDistance}}}).toArray(function(err, document) {
        if(err) {
            console.log(err);
        }
        callback(document);
    });


}

module.exports = {
    getEvents: getEvents
}
