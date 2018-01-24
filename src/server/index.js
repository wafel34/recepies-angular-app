require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const databaseURL = "mongodb://"+process.env.USER+":"+process.env.PASSWORD+"@ds115198.mlab.com:15198/recipes-angular-db";
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
