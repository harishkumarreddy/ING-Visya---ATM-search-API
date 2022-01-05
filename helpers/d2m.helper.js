const fs = require('fs');
const path = require('path');
const atms = require('../data/adapters/atm.adapter')
const users = require('../data/adapters/users.adapter')

class D2M{
    loadAtmData(dataFileName){
        return new Promise((resolve, reject) =>{
            fs.readFile(path.join(path.dirname(__dirname), 'data', 'jsons', dataFileName), function(err, data) {
                if(err) reject(err);
                let atmData = {};
                JSON.parse(data.toString()).forEach((rec, i) => {
                    rec['id'] = 'atm_'+i;
                    atmData['atm_'+i] = rec;
                });
                atms.data = atmData;
                resolve("ATMs data loaded into adapter.")
              });
        });
        
    }

    loadUserData(dataFileName){
        return new Promise((resolve, reject) =>{
            fs.readFile(path.join(path.dirname(__dirname), 'data', 'jsons', dataFileName), function(err, data) {
                if(err) reject(err);
                users.data = JSON.parse(data.toString());
                resolve("Users data loaded into adapter.")
              });
        });
        
    }
}

module.exports = new D2M();