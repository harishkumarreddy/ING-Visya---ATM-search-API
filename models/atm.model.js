const db = require('../data/adapters/atm.adapter');
const moment = require('moment');
class Atm {
    async createAtm(data) {
        data['id'] = 'atm' + moment().format('YYYYMMDDSHHmmss');
        let atm =  await db.add(data);
        return atm;

    }

    async search() {
        let atms =  await db.getAll()
        return atms

    }

    async getAtm(id) {
        let atms =  await db.get(id);
        return atms
    }

    async updateAtm(id, data) {
        let atms =  await db.update(id, data);
        return atms
    }

    async deleteAtm(id) {
        let atms =  await db.delete(id);
        return atms
    }

}

module.exports = new Atm();