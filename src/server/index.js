const MongoClient = require('mongodb').MongoClient;
const databaseURL = "mongodb://127.0.0.1:27017/recepies-angular-db";
const createExpressApp = require('./create-express-app');
require('dotenv').config();
MongoClient.connect(databaseURL, (err, db) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to database...');
    //create express application with detabase details
    createExpressApp(db);
});
