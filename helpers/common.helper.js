const bcript = require('bcrypt');

class CommonHelper {
    getSalt(){
        let salt = process.env.SALT;
        return salt;
    }
    getRandomSalt(){
        let salt = bcript.genSaltSync(Math.random() * 10);
       return salt;
    }

}

module.exports = new CommonHelper();