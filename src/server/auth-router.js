const express = require('express');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

function AuthRouter(database) {
    const users = database.collection('users');

    router.post('/', (req, res) => {
        const postData = req.body;

        users.findOne({username: postData.username}, (err, result) => {
            if (!result) {
                return res.status(404).json({error: `User doesn't exist.`});
            }
            if (!bcrypt.compareSync(postData.password, result.password)) {
                 return res.status(401).json({error: 'Invalid password'});
            }

            const token = JWT.sign(postData, process.env.SECRET, {expiresIn: '4h'});
            return res.status(200).json({
                token: token,
                username: postData.username,
                message: 'Successfully logged in.'
            });
        });



    });

    return router;
}

module.exports = AuthRouter;
