const MongoClient = require('mongodb').MongoClient;
const databaseURL = "mongodb://127.0.0.1:27017/recepies-angular-db";
const recepies = require('./recepies.json');

function seedDatabase(collectionName, data) {
    MongoClient.connect(databaseURL, (err, db)=>{
        if (err) {
            console.log(err);
            return;
        }
        const collection = db.collection(collectionName);

        collection.remove();
        collection.insertMany(data, ()=>{
            console.log('records inserted...');
        });

        db.close();
        console.log('database closed...');

    });
}

seedDatabase('recepies', recepies);
