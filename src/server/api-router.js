const express = require('express');
const router = express.Router();

function ApiRouter(database) {
    const recepies = database.collection('recepies');
    const users = database.collection('users');


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
        recepies.findOne({shortName: record.shortName}, (err, dbRecord) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (dbRecord) {
                //if the same shortName does exist: return with 403, as shortName must be unique
                return res.status(403).send({error: "Shortname already exists. It must be unique."});
            } else {

                //if shortName doesn't exist - go ahead and insert the recepie
                recepies.insertOne(record, (err, result) => {
                    if (err) {
                        res.status(500).send({error: "Database error."});
                    }
                    const finalReuslt = result.ops[0];
                    return res.json(finalReuslt).status(201);
                });
            }
        });

    });


    return router;
}

module.exports = ApiRouter;