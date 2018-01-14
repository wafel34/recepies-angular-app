const express = require('express');
const mongodb = require('mongodb');
const AuthRouter = require('./auth-router');
const jwt = require('express-jwt');
const router = express.Router();

function ApiRouter(database) {
    const recepies = database.collection('recepies');
    const users = database.collection('users');

    router.use(jwt({secret: process.env.SECRET}).unless({path: [
        { url: '/api/authenticate'},
        { url: '/api/recepies', methods: ['GET']},
        { url: /\/api\/recepies\/.*/g, methods: ['GET']},
        { url: /\/api\/.{1,}\/recepies/g, methods: ['GET']}
        ]})
    );

    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).json({error: err.message});
        }
    });

    router.use('/authenticate', AuthRouter(database));

    router.get('/recepies', (req, res) => {

        //find all elements, convert to array and send back as json
        const result = recepies.find().toArray((err,result)=>{
            if (err) {
                res.status(500).send({error: "Database error."});
            }
            return res.json(result).status(200);
        });
    });

    router.post('/recepies', (req, res) => {
        const record = req.body;
        //check if record with the same shortName as request exists
        recepies.findOne({shortName: record.shortname}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (dbRecord) {
                //if the same shortName does exist: return with 403, as shortName must be unique
                return res.status(403).send({error: "Shortname already exists. It must be unique."});
            } else {

                //if shortName doesn't exist - go ahead and insert the recepie
                recepies.insertOne({
                    name: record.name,
                    shortName: record.shortname,
                    headline: record.headline,
                    summary: record.summary,
                    category: record.category,
                    time: record.time,
                    serves: record.serves,
                    ingredients: record.ingredients,
                    instructions: record.instructions,
                    photoUrl: record.photoUrl
                }, (err, result) => {
                    if (err) {
                        res.status(500).send({error: "Database error."});
                    }
                    const finalReuslt = result.ops[0];
                    return res.json(finalReuslt).status(201);
                });
            }
        });
    });


    router.get('/recepies/:shortName', (req, res) => {
        const name = req.params.shortName;
        const result = recepies.findOne({shortName: name}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (dbRecord === null) {
                return res.sendStatus(404);
            }
            return res.json(dbRecord).status(200);
        });
    });

    router.put('/recepies/:shortName', (req, res) => {
        const record = req.body;
        const mongoId = new mongodb.ObjectID(record._id);
        const result = recepies.findOneAndUpdate({_id: mongoId},{
            $set: {
                name: record.name,
                shortName: record.shortname,
                headline: record.headline,
                summary: record.summary,
                category: record.category,
                time: record.time,
                serves: record.serves,
                ingredients: record.ingredients,
                instructions: record.instructions,
                photoUrl: record.photoUrl
            }
        },
        {
            returnOriginal: false
        },
        (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            return res.json(dbRecord).status(200);
        });

    });

    router.delete('/recepies/:shortName', (req, res) => {
        const name = req.params.shortName;

        const result = recepies.deleteOne({shortName: name}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            return res.json(dbRecord).status(200);
        });
    });

    router.get('/:user/recepies', (req, res) => {
        const user = req.params.user;
        recepies.find({createdBy: user}).toArray((err, result) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (!result[0]) {
                return res.sendStatus(404);
            }
            return res.json(result).status(200);
        });
    });

    router.get('/:user/favorites', (req, res) => {
        const user = req.params.user;
        var favorites;
        users.findOne({username: user}, (err, result) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (!result) {
                return res.sendStatus(404);
            }
            favorites = result.favorites;
            let convertedFavorites = favorites.map((item) => {
                return item = new mongodb.ObjectID(item);
            });
            recepies.find({_id: { $in: convertedFavorites}}).toArray((err, data) => {
                res.json(data);
            });
        });


        /*
        recepies.find({createdBy: user}).toArray((err, result) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (!result[0]) {
                return res.sendStatus(404);
            }
            return res.json(result).status(200);
        });*/
    });

    return router;
}

module.exports = ApiRouter;
