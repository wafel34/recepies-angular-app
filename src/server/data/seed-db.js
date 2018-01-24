require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const databaseURL = "mongodb://"+process.env.USER+":"+process.env.PASSWORD+"@ds115198.mlab.com:15198/recipes-angular-db";
const recipes = require('./recipes.json');
const users = require('./users.json');
const bcrypt = require('bcrypt');

function seedDatabase(collectionName, data) {
    let tempData = data;
    MongoClient.connect(databaseURL, (err, db)=>{
        if (err) {
            console.log(err);
            return;
        }
        const collection = db.collection(collectionName);
        collection.remove();
        tempData.forEach((item) => {
            if (item.password) {
                item.password = bcrypt.hashSync(item.password, 10);
            }
        });


        collection.insertMany(tempData, ()=>{
            console.log('records inserted...');
        });

        db.close();
        console.log('database closed...');

    });
}

seedDatabase('recipes', recipes);
seedDatabase('users', users);
