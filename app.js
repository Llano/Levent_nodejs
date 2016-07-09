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

// ------ Arguments ------ //
var port,user,pw,db;
for(var i=2; i<process.argv.length; i++) {
  console.log(process.argv[i]);
  if(process.argv[i].startsWith("--")) {
    var name = process.argv[i].slice(2).split("=")[0].toUpperCase();
    switch(name) {
      case "PORT":
        if(process.argv[i].split("=").length !== 2) break;
        port = parseInt(process.argv[i].split("=")[1]);
        break;
      case "USER":
        if(process.argv[i].split("=").length !== 2) break;
        user = process.argv[i].split("=")[1];
        break;
      case "PASSWORD":
        if(process.argv[i].split("=").length !== 2) break;
        pw = process.argv[i].split("=")[1];
        break;
      case "DB":
        if(process.argv[i].split("=").length !== 2) break;
        db = process.argv[i].split("=")[1];
        break;
      default:
        console.log("Unknown flag \""+name+"\"")
    }
  }
}
if(port==null) {
  console.log("No port specified, using default port 3000");
  port = 3000;
}
if(user==null) {
  user = "username"
}
if(pw==null) {
  pw = "password"
}
if(db==null) {
  db = "localhost";
}

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});

app.get('*', function(req, res){
  res.status(404).send('Not found');
});
