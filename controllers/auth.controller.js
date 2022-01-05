const createError = require('http-errors');
const Users = require('../models/users.model');
const cHelper = require('../helpers/common.helper');
const JwtUtil = require('../utils/jwt.util');
const speech = require('../configs/speeches.config');
const {hashSync } = require('bcrypt');

class AuthController {
  constructor() { }

  async login(req, res, next) {
    // TODO: Need to add propper validation
    let userData = req.body;
    // console.log(JSON.parse(userData))
    if(Object.keys(userData).length!=2 && (Object.keys(userData).join(",")!== "username,password")){
      res.status(401).json({errcode:speech.INVALID_USER_ERRCODE,"message": speech.INVALID_USER});
      res.end();
    }else{
      userData.password = hashSync(userData.password, cHelper.getSalt());
      let data = await Users.loginUser(userData);
      if (data === undefined) {
        res.status(401).json({errcode:speech.INVALID_USER_ERRCODE,"message": speech.INVALID_USER});
        res.end()
      }
      
      let resData = {};
        JwtUtil.createToken(data, parseInt(process.env.ACCESS_TOKEN_TIMEOUT) * 60).then((token) => {
          resData.access_token = token;
          resData.access_token_timeout = parseInt(process.env.ACCESS_TOKEN_TIMEOUT)*60 ;
          resData.access_token_type = speech.ACCESS_TOKEN_TYPE ;

          data.is_refresh=true;
          JwtUtil.createToken(data, parseInt(process.env.REFRESH_TOKEN_TIMEOUT) * 60).then((token) => {
            resData.refresh_token = token;
            resData.refresh_token_timeout = parseInt(process.env.REFRESH_TOKEN_TIMEOUT) * 60;
            resData.refresh_token_type = speech.REFRESH_TOKEN_TYPE ;
            // returning dat
            res.status(200).json(resData);
          }).catch((e) => {
            console.log(e);
            next(createError(500, {errcode:speech.UNABLE_TO_CREATE_TOKEN_ERRCODE, message: speech.UNABLE_TO_CREATE_TOKEN}));
          });
        }).catch((e) => {
          console.log(e)
          next(createError(500, {errcode:speech.UNABLE_TO_CREATE_TOKEN_ERRCODE, message: speech.UNABLE_TO_CREATE_TOKEN}));
        });
     }
  }

  refreshToken(req, res, next) {
    let resData = {};
    if(res.locals.is_refresh!==true){
      next(createError(401, {errcode:speech.INVALID_TOKEN_ERRCODE, message: speech.INVALID_TOKEN}));
    }else{
      delete res.locals.is_refresh;
      JwtUtil.createToken(res.locals, parseInt(process.env.ACCESS_TOKEN_TIMEOUT) * 60).then((token) => {
        resData.access_token = token;
        resData.access_token_timeout = parseInt(process.env.ACCESS_TOKEN_TIMEOUT)*60 ;
        resData.access_token_type = speech.ACCESS_TOKEN_TYPE ;
        res.locals.is_refresh=true;
        JwtUtil.createToken(res.locals, parseInt(process.env.REFRESH_TOKEN_TIMEOUT) * 60).then((token) => {
          resData.refresh_token = token;
          resData.refresh_token_timeout = parseInt(process.env.REFRESH_TOKEN_TIMEOUT) * 60;
          resData.refresh_token_type = speech.REFRESH_TOKEN_TYPE ;
          // returning dat
          res.status(200).json(resData);
        }).catch((e) => {
          console.log(e);
          next(createError(500, {errcode:speech.UNABLE_TO_CREATE_TOKEN_ERRCODE, message: speech.UNABLE_TO_CREATE_TOKEN}));
        });
      }).catch((e) => {
        console.log(e)
        next(createError(500, {errcode:speech.UNABLE_TO_CREATE_TOKEN_ERRCODE, message: speech.UNABLE_TO_CREATE_TOKEN}));
      });
    }
  }

}

module.exports = new AuthController();