const express = require('express');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

function RegisterRouter(database) {
    const users = database.collection('users');

    router.post('/', (req, res) => {
        const requestBody = req.body;

        requestBody.password =bcrypt.hashSync(requestBody.password, 10);

        users.findOne({$or: [{username: requestBody.username}, {email: requestBody.email}] }, (err, result) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (result) {
            //if the same shortName does exist: return with 403, as shortName must be unique
                if (result.email === requestBody.email) {
                    return res.status(409).send({error: "Email already exists in database. Please select another."});
                }
                if (result.username === requestBody.username) {
                    return res.status(409).send({error: "Username already exists in database. Please select another."});
                }
            } else {
            //if shortName doesn't exist - go ahead and insert the recipe
                users.insertOne({
                    username: requestBody.username,
                    password: requestBody.password,
                    email: requestBody.email
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

    return router;
}

module.exports = RegisterRouter;
