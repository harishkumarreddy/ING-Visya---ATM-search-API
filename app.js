const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const logger = require('morgan');
// TODO: Loging is in pending.

require("dotenv").config();

const routeGaurd  = require('./middleware/protectroute.middleware');
const corsMiddleware  = require('./middleware/cors.middleware');
const approutes = require('./routes/app.routes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(corsMiddleware );
app.use(routeGaurd );
app.use(approutes);


// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
    if(err || req.status >= 400){
        //set locals, only providing error in development
        res.locals.message = err;
        res.locals.error = process.env.SHOW_ERRORS === 'true' ? err : {};
    
        // render the error page
        res.status(err.status || 500);
        res.json(err);
    }
});

module.exports = app;

