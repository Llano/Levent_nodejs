var parseHeaderCoordinates = function(str) {
    var coord = str.split(',');
    var array = [parseFloat(coord[0]), parseFloat(coord[1])];
    return array;
}
var parseArguments = function() {
    var array = {};
    for(var i=2; i<process.argv.length; i++) {
        if(process.argv[i].startsWith("--")) {
            var name = process.argv[i].slice(2).split("=")[0].toUpperCase();
            array[name] = process.argv[i].split("=").length !== 2 ? null : process.argv[i].split("=")[1];
        }
    }
    return array;
}

module.exports = {
    parseHeaderCoordinates: parseHeaderCoordinates,
    parseArguments: parseArguments
}
