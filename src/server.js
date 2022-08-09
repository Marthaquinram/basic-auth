'use strict';

// 3rd Party Dependencies (modules)
const express = require('express');

// Our own custom modules
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const authRoutes = require('./middleware/auth/route.js');

const validateToken = require('./middleware/auth/auth');
const { Food, Clothes, Users } = require('./models/index');

// STRETCH GOAL
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');

const app = express();

// Express Global Middleware
app.use(express.json());

// Our own Global Middleware
app.use(logger);

app.use('/v1', v1Routes([Food, Clothes]));
app.use(authRoutes);
app.use(validateToken);
app.use('/v2', v2Routes([Food, Clothes, Users]));



// STRETCH GOAL

// Our Error Handlers -- need to be the last things defined!
// These use the external modules we required above
app.use('*', notFoundHandler);
app.use(errorHandler);

// Export an object with the express app and separate method that can start the server
module.exports = {
    server: app,
    start: (port) => {
        if (!port) {
            throw new Error('Missing Port');
        }
        app.listen(port, () => console.log(`Listening on ${port}`));
    },
};
// testing testing
