var parseHeaderCoordinates = function(str) {
    var coord = str.split(',');
    var array = [parseFloat(coord[0]), parseFloat(coord[1])];
    return array;
}

module.exports = {
    parseHeaderCoordinates: parseHeaderCoordinates
}
