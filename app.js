var express = require('express');
var app = express();
var path      = require('path')
var router = express.Router();
var utilities = require('./helpers/utilities');
var bodyParser = require('body-parser');


// ------ Middleware ------  //

//Parse all request to /api/v1/ to json
router.use(bodyParser.json());


// ------ Router ------ //

app.use('/api/v1/', router);


// ------ Routes ------ //
var tokenRoute = require('./routes/tokenRoutes')(router);
var eventRouter = require('./routes/eventRoutes')(router);

// ------ Arguments ------ //
for(var i=2; i<process.argv.length; i++) {
  if(process.argv[i] == "-h" || process.argv[i] == "--help") {
    console.log("Levent\n\nArguments:\n--port=PORT\n\tSpecifies the PORT to "
               +"listen on.\n\tDefault: 3000\n--db=URL\n\tSpecifies the URL to"
               +" the database to run with.\n\tDefault: localhost\n--user=USER"
               +"\n\tSpecifies the username to log into the database.\n\t"
               +"Default: user\n--pw=PASSWORD\n\tSpecifies the PASSWORD used to"
               +" log into the database.\n\tDefault: password\n--help, -h\n\t "
               +"Display this help message.");
    process.exit();
  }
}

var args = utilities.parseArguments();
var port = 3000;
if(args["PORT"] == null) {
  console.log("No port specified, using default port 3000");
} else {
  port = parseInt(args["PORT"]);
}


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
  console.log('Levent listening on port '+port+'!');
});

app.get('*', function(req, res){
  res.status(404).send('Not found');
});
