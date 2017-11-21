const express = require('express');
const app = express();

function createExpressApp(database) {
    app.listen(3000, ()=>{
        console.log('App listening on port 3000');
    });

    app.get('/api/recepies', (req, res)=>{
        const recepies = database.collection('recepies');
        const result = recepies.find().toArray((err,result)=>{
            if (err) {
                res.status(500).send({error: "Database error."});
            }
            return res.json(result).status(200);
        });

    });
}

module.exports = createExpressApp;
