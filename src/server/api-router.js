const express = require('express');
const mongodb = require('mongodb');
const AuthRouter = require('./auth-router');
const RegisterRouter = require('./register-router');
const jwt = require('express-jwt');
const router = express.Router();

function ApiRouter(database) {
    const recepies = database.collection('recepies');
    const users = database.collection('users');

    // protect paths for unauthorized users with execptions below (.unless({}))
    router.use(jwt({secret: process.env.SECRET}).unless({path: [
        { url: '/api/authenticate'},
        { url: '/api/register'},
        { url: '/api/recepies', methods: ['GET']},
        { url: /\/api\/recepies\/.*/g, methods: ['GET']}
        ]})
    );

    // catch error when user is unauthorized
    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).json({error: err.message});
        }
    });

    router.use('/authenticate', AuthRouter(database));
    router.use('/register', RegisterRouter(database));

    // GET all recepies
    router.get('/recepies', (req, res) => {
        //find all elements, convert to array and send back as json
        const result = recepies.find().toArray((err,result)=>{
            if (err) {
                res.status(500).send({error: "Database error."});
            }
            return res.json(result).status(200);
        });
    });

    // ADD NEW recepie
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
                    photoUrl: record.photoUrl,
                    createdBy: record.createdBy,
                    favoriteFor: []
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

    // GET one recepie
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

    // UPDATE ONE recepie
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

    // DELETE ONE recepie
    router.delete('/recepies/:shortName', (req, res) => {
        const name = req.params.shortName;

        const result = recepies.deleteOne({shortName: name}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            return res.json(dbRecord).status(200);
        });
    });

    // UPDATE ONE recepie - actually update information about user that add this recepie as favourite
    router.put('/recepies/:shortName/favorites', (req, res) => {
        const name = req.params.shortName;
        const username = req.body.username;

        /*
            Below query is responsible for updateing 'favoritesFor' section in recepie record.
            This happens in both situations - when user is adding item to favorites and when is removing it.
        */
        recepies.findOneAndUpdate({
            // First I send a query for a record with recepies shortName that don't have current username in it's favoritesFor
            // (hence the {$ne: username} query)
            shortName: name,
            favoriteFor: {
                $ne: username
            }
            },
            {
                $push: {
                    // when search was sucesfull i'm pushing username to recepies 'favoriteFor' array
                    favoriteFor: username
                }
            },
            {
                returnOriginal: false
            }, (err, result) => {
                if (err) {
                    return res.status(500).send({error: err});
                }

                if (result.lastErrorObject.updatedExisting) {
                    // when query was found, username has been added to favorites and i'm sending back updated data.
                    return res.status(200).json({
                        message: 'Added to favorites',
                        result: result
                    });
                }

                if (!result.lastErrorObject.updatedExisting) {
                    // if record hasn't been updated it means that username was already in recepies 'favoritesFor' array
                    // In this case i'm performing the same query, but instead of pushing elemnt to 'favoritesFor' toArray
                    // I will pull it out of array, which will remove username from favorites.
                    recepies.findOneAndUpdate(
                        {shortName: name},
                        {
                            $pull:
                            // pulling username from 'favoritesFor' array
                                {
                                    favoriteFor: username
                                }
                        },
                        {
                            returnOriginal: false
                        }, (err, secondResult) => {
                            if (err) {
                                return res.status(500).send({error: err});
                            }
                            if (secondResult.lastErrorObject.updatedExisting) {
                                // once this has been done i'm sending secondResult (result of second query) back to user
                                return res.status(200).json({
                                    message: 'Removed to favorites',
                                    result: secondResult
                                });
                            }
                        });
                } // end IF (!result.lastErrorObject.updatedExisting)
        });
    });

    // GET all USER recepies
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

    // GET all USER FAVORITE recepies
    router.get('/:user/favorites', (req, res) => {
        const user = req.params.user;
        recepies.find({favoriteFor: user}).toArray((err, result) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (!result[0]) {
                return res.sendStatus(404);
            }
            return res.json(result).status(200);
        });
    });

    return router;
}

module.exports = ApiRouter;
