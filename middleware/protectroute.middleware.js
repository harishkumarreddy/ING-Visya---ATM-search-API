const createError = require('http-errors');
const wildcardRoutes = require('../configs/wildcardroutes.config');
const speech = require('../configs/speeches.config');
const JwtUtil = require('../utils/jwt.util');

module.exports = function protectRoute(req, res, next) {
    if (wildcardRoutes.indexOf(req.path) > -1) {
        res.locals ={
            id: process.env.DEFAULT_AUDIT_USER
        };
        next();
    } else {
        if (req.headers.authorization === undefined || req.headers.authorization === "" || req.headers.authorization.indexOf("Bearer ") !== 0) {
            res.status(401).send(speech.UNAUTHORIZED);
        } else {
            let token = req.headers.authorization.replace("Bearer ", "");
            JwtUtil.validateToken(token).then((data) => {
                if(data.message != undefined && data.message == "Invalid token."){
                    next(createError(401, {errcode:speech.INVALID_TOKEN_ERRCODE, message: speech.INVALID_TOKEN}));
                }else if(data.message != undefined && data.message == "jwt expired"){
                    next(createError(401, {errcode:speech.EXPIRED_TOKEN_ERRCODE, message: speech.EXPIRED_TOKEN}));
                }else{
                    delete data.iat;
                    delete data.exp;
                    
                    res.locals = data;
                    next();
                }
            }).catch((err) => {
                console.log(err);
                if(err.message != undefined && err.message == "jwt expired"){
                    next(createError(401, {errcode:speech.EXPIRED_TOKEN_ERRCODE, message: speech.EXPIRED_TOKEN}));
                }else{
                    next(createError(401, {errcode:speech.INVALID_TOKEN_ERRCODE, message: speech.INVALID_TOKEN}));
                }
            });
        }
    }
};