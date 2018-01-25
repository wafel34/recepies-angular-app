const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ApiRouter = require('./api-router');
const path = require('path');
const compression = require('compression');
const cache = require('apicache').middleware;

function createExpressApp(database) {
    app.set('port', (process.env.PORT || 3000));
    //midlewares
    app.use(bodyParser.json());
    app.use(cache('5 mins'));
    app.use(compression());
    app.use(express.static(path.join(__dirname, 'public')));

    //routers
    app.use('/api', ApiRouter(database));

    app.use('*', (req, res)=>{
        return res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    //listen
    app.listen(app.get('port'), ()=>{
        console.log('App listening on port 3000');
    });
}

module.exports = createExpressApp;
