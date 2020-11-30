require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
// const databaseURL = "mongodb://"+process.env.USER+":"+process.env.PASSWORD+"@ds115198.mlab.com:15198/recipes-angular-db";
// const databaseURL = "mongodb+srv://"+process.env.USER+":"+process.env.PASSWORD+"@recipes-angular-db.noc3w.mongodb.net/recipes-angular-db?retryWrites=true&w=majority";
const databaseURL = "mongodb://"+process.env.USER+":"+process.env.PASSWORD+"@recipes-angular-db-shard-00-00.noc3w.mongodb.net:27017,recipes-angular-db-shard-00-01.noc3w.mongodb.net:27017,recipes-angular-db-shard-00-02.noc3w.mongodb.net:27017/recipes-angular-db?ssl=true&replicaSet=atlas-st29w3-shard-0&authSource=admin&retryWrites=true&w=majority";
const createExpressApp = require('./create-express-app');

MongoClient.connect(databaseURL, (err, db) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to database...');
    //create express application with detabase details
    createExpressApp(db);
});
