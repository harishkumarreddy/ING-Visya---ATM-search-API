const jwt = require('jsonwebtoken');
const cHelper = require('../helpers/common.helper');
const speech = require('../configs/speeches.config');
const { promise } = require('bcrypt/promises');

class JwtUtil{

    async createToken(data = {}, expires){
        if(expires==""){
            expires =process.env.TOKEN_DEFAULT_TIMEOUT;
        }
        
        if(Object.keys(data).length){
            try{
                return jwt.sign(data, process.env.SALT, {
                    expiresIn: expires 
                  });
            }catch(err){
                console.log(err);
                return new Error({errcode:speech.UNABLE_TO_CREATE_TOKEN_ERRCODE, message: speech.UNABLE_TO_CREATE_TOKEN});
            }
            
        }else{
            return new Error({errcode:speech.INVALID_DATA_SEND_TO_CREATE_TOKEN_ERRCODE, message: speech.INVALID_DATA_SEND_TO_CREATE_TOKEN});
        }
    }

    async validateToken(token){
        try{
            return jwt.verify(token, process.env.SALT,(err, result)=>{
                return new Promise((resolve, reject)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            });
        }catch(err){
            console.log(err);
            return new Error({errcode:speech.INVALID_TOKEN_ERRCODE, message: speech.INVALID_TOKEN});
        }
    }

}

module.exports = new JwtUtil();