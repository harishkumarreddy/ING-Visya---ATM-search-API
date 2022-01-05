const UserModel = require('../models/users.model');
const bcript = require("bcrypt");
const cHelper = require('../helpers/common.helper');
const speech = require('../configs/speeches.config');

class UserController {

    async createUser(req, res, next) {
        if (Object.keys(req.body).length === 0) {
            res.json({errcode:speech.INVALID_DATA_SUBMITTED_ERRCODE, message: speech.INVALID_DATA_SUBMITTED})
        } else {
            let reqData = req.body
            reqData.password = await bcript.hash(reqData.password, cHelper.getSalt());
            let resultData = await UserModel.createUser(reqData)
            if (resultData === undefined) {
                res.status(500).json({errcode:speech.SOMTHING_WENT_WRONG_ERRCODE, message: speech.SOMTHING_WENT_WRONG});
                res.end()
            }
            else { res.status(200).json(resultData) }
        }
        next();
    }

    async getAllUsers(req, res, next) {
        let resultData = await UserModel.getAllUsers()
        if (resultData === undefined) {
            res.status(500).json({errcode:speech.SOMTHING_WENT_WRONG_ERRCODE, message: speech.SOMTHING_WENT_WRONG});
            res.end()
        }
        else {
            resultData.forEach((r, i)=>{
                delete r.password;
                delete r.is_refresh;
                resultData[i] = r;
            });
            res.status(200).json(resultData);
        }
        next();
    }

    async getUser(req, res, next) {
        let resultData = await UserModel.getUser(req.params.uid)
        if (resultData === undefined) {
            res.status(500).json({errcode:speech.SOMTHING_WENT_WRONG_ERRCODE, message: speech.SOMTHING_WENT_WRONG});
            res.end()
        }
        else {
            delete resultData.password;
            delete resultData.is_refresh;
            res.status(200).json(resultData);
        }
        next();
    }

    async updateUser(req, res, next) {
        let reqData = req.body;
        reqData.password = await bcript.hash(reqData.password, cHelper.getSalt());
        let resultData = await UserModel.updateUser(req.params.uid, reqData)
        if (resultData === undefined) {
            res.status(500).json({errcode:speech.SOMTHING_WENT_WRONG_ERRCODE, message: speech.SOMTHING_WENT_WRONG});
            res.end()
        }
        else { res.status(200).json(resultData); }
        next();
    }

    async deleteUser(req, res, next) {
        let resultData = await UserModel.deleteUser(req.params.uid)
        if (resultData === undefined) {
            res.status(500).json({errcode:speech.SOMTHING_WENT_WRONG_ERRCODE, message: speech.SOMTHING_WENT_WRONG});
            res.end()
        }
        else { res.status(200).json({ message: "User deleted successfully." }) }
        next();
    }

}

module.exports = new UserController()
