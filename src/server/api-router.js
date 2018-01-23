const express = require('express');
const mongodb = require('mongodb');
const AuthRouter = require('./auth-router');
const RegisterRouter = require('./register-router');
const jwt = require('express-jwt');
const router = express.Router();

function ApiRouter(database) {
    const recipes = database.collection('recipes');
    const users = database.collection('users');

    // protect paths for unauthorized users with execptions below (.unless({}))
    router.use(jwt({secret: process.env.SECRET}).unless({path: [
        { url: '/api/authenticate'},
        { url: '/api/register'},
        { url: '/api/recipes', methods: ['GET']},
        { url: /\/api\/recipes\/.*/g, methods: ['GET']}
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

    // GET all recipes
    router.get('/recipes', (req, res) => {
        //find all elements, convert to array and send back as json
        const result = recipes.find().toArray((err,result)=>{
            if (err) {
                res.status(500).send({error: "Database error."});
            }
            return res.json(result).status(200);
        });
    });

    // ADD NEW recipe
    router.post('/recipes', (req, res) => {
        const record = req.body;
        //check if record with the same shortName as request exists
        recipes.findOne({shortName: record.shortname}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (dbRecord) {
                //if the same shortName does exist: return with 403, as shortName must be unique
                return res.status(403).send({error: "Shortname already exists. It must be unique."});
            } else {

                //if shortName doesn't exist - go ahead and insert the recipe
                recipes.insertOne({
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

    // GET one recipe
    router.get('/recipes/:shortName', (req, res) => {
        const name = req.params.shortName;
        const result = recipes.findOne({shortName: name}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (dbRecord === null) {
                return res.sendStatus(404);
            }
            return res.json(dbRecord).status(200);
        });
    });

    // UPDATE ONE recipe
    router.put('/recipes/:shortName', (req, res) => {
        const record = req.body;
        const mongoId = new mongodb.ObjectID(record._id);
        const result = recipes.findOneAndUpdate({_id: mongoId},{
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

    // DELETE ONE recipe
    router.delete('/recipes/:shortName', (req, res) => {
        const name = req.params.shortName;

        const result = recipes.deleteOne({shortName: name}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            return res.json(dbRecord).status(200);
        });
    });

    // UPDATE ONE recipe - actually update information about user that add this recipe as favourite
    router.put('/recipes/:shortName/favorites', (req, res) => {
        const name = req.params.shortName;
        const username = req.body.username;

        /*
            Below query is responsible for updateing 'favoritesFor' section in recipe record.
            This happens in both situations - when user is adding item to favorites and when is removing it.
        */
        recipes.findOneAndUpdate({
            // First I send a query for a record with recipes shortName that don't have current username in it's favoritesFor
            // (hence the {$ne: username} query)
            shortName: name,
            favoriteFor: {
                $ne: username
            }
            },
            {
                $push: {
                    // when search was sucesfull i'm pushing username to recipes 'favoriteFor' array
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
                    // if record hasn't been updated it means that username was already in recipes 'favoritesFor' array
                    // In this case i'm performing the same query, but instead of pushing elemnt to 'favoritesFor' toArray
                    // I will pull it out of array, which will remove username from favorites.
                    recipes.findOneAndUpdate(
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

    // GET all USER recipes
    router.get('/:user/recipes', (req, res) => {
        const user = req.params.user;
        recipes.find({createdBy: user}).toArray((err, result) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (!result[0]) {
                return res.sendStatus(204);
            }
            return res.json(result).status(200);
        });
    });

    // GET all USER FAVORITE recipes
    router.get('/:user/favorites', (req, res) => {
        const user = req.params.user;
        recipes.find({favoriteFor: user}).toArray((err, result) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (!result[0]) {
                return res.sendStatus(204);
            }
            return res.json(result).status(200);
        });
    });

    return router;
}

module.exports = ApiRouter;
