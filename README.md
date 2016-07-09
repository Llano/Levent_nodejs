# Levent_nodejs

#Requirements
* Nodejs
* MongoDB


#Setup
* npm install
* Create a new file in the root directory of the project, and name it ```jwt.key```. Insert the a random secret key, preferably 32-bit.

#Running
Run with default settings: `nodejs app.js`  
Run with custom settings: `nodejs app.js --port=6969 --db=192.168.0.104 --user=dbuser --pw=dbpassword`  
Show list of arguments: `nodejs app.js --help`

##Default settings
* Port = 3000
* Db = localhost
* User = user
* Pw = password

# Importing database
https://docs.mongodb.com/getting-started/shell/import-data/
