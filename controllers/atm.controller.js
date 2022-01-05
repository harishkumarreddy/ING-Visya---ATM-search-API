const AtmModel = require('../models/atm.model');
const speech = require('../configs/speeches.config');

class AtmController {

    async createAtm(req, res, next) {
        if (Object.keys(req.body).length === 0) {
            res.json({errcode:speech.INVALID_DATA_SUBMITTED_ERRCODE, message: speech.INVALID_DATA_SUBMITTED})
        } else {
            let reqData = req.body
            let resultData = await AtmModel.createAtm(reqData)
            if (resultData === undefined) {
                res.status(500).json({errcode:speech.SOMTHING_WENT_WRONG_ERRCODE, message: speech.SOMTHING_WENT_WRONG});
                res.end()
            }
            else { res.status(200).json(resultData) }
        }
        next();
    }

    async search(req, res, next) {
        let resultData = await AtmModel.search()
        if (resultData === undefined) {
            res.status(500).json({errcode:speech.SOMTHING_WENT_WRONG_ERRCODE, message: speech.SOMTHING_WENT_WRONG});
            res.end()
        }
        else {
            let finalResult = [];
            if(!req.params.city){
                finalResult = resultData;
            }else{
                finalResult = resultData.filter((rec) => {
                    return rec.address.city === req.params.city
                });
            }
            res.status(200).json({total: finalResult.length, data:finalResult});
        }
        next();
    }

    async getAtm(req, res, next) {
        let resultData = await AtmModel.getAtm(req.params.id)
        if (resultData === undefined) {
            res.status(500).json({errcode:speech.SOMTHING_WENT_WRONG_ERRCODE, message: speech.SOMTHING_WENT_WRONG});
            res.end()
        }
        else {
            res.status(200).json(resultData);
        }
        next();
    }

    async updateAtm(req, res, next) {
        let reqData = req.body;
        let resultData = await AtmModel.updateAtm(req.params.id, reqData)
        if (resultData === undefined) {
            res.status(500).json({errcode:speech.SOMTHING_WENT_WRONG_ERRCODE, message: speech.SOMTHING_WENT_WRONG});
            res.end()
        }
        else { res.status(200).json(resultData); }
        next();
    }

    async deleteAtm(req, res, next) {
        let resultData = await AtmModel.deleteAtm(req.params.id)
        if (resultData === undefined) {
            res.status(500).json({errcode:speech.SOMTHING_WENT_WRONG_ERRCODE, message: speech.SOMTHING_WENT_WRONG});
            res.end()
        }
        else { res.status(200).json({ message: "ATM deleted successfully." }) }
        next();
    }

}

module.exports = new AtmController()
