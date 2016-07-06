var express = require('express');
var app = express();
var path      = require('path')
var router = express.Router();

var bodyParser = require('body-parser');



// ------ Middleware ------  //

//Parse all request to /api/v1/ to json
router.use(bodyParser.json());


// ------ Router ------ //

app.use('/api/v1/', router);


// ------ Routes ------ //
var tokenRoute = require('./routes/tokenRoutes')(router);
var eventRouter = require('./routes/eventRoutes')(router);



app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
