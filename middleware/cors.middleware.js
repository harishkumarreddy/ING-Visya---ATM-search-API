const whitelist = require('../configs/cors.config');
const createError = require('http-errors');
const speech = require('../configs/speeches.config');

module.exports = function corsMiddleware(req, res, next) {
    res.setHeader("X-Maintained-By", process.env.X_MAINTAINED_BY);
    if (whitelist.indexOf('*') !== -1 || whitelist.indexOf(req.header('Origin')) !== -1 ) {
        next();
    }else{
        next(createError(401, {errcode:speech.NOT_ALLOWED_BY_CORS_ERRCODE, message: speech.NOT_ALLOWED_BY_CORS}));
    }
    
};