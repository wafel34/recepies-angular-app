const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ApiRouter = require('./api-router');
const path = require('path');

function createExpressApp(database) {
    //midlewares
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));

    //routers
    app.use('/api', ApiRouter(database));

    //listen
    app.listen(3000, ()=>{
        console.log('App listening on port 3000');
    });
}

module.exports = createExpressApp;
