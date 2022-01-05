const atm = {
    data : {},

    get : (key) => {
        return (atm.data[key] == undefined)? undefined : atm.data[key]
    },
    getAll: () =>{
        return Object.values(atm.data);
    },

    add : (newRec) => {
        let status = false
        if(atm.data[newRec.id] === undefined){
            atm.data[newRec.id] = newRec;
            status = true;
        }
        return (status)? atm.data[newRec.id] : undefined; 
    },
    update : (key, newRec) => {
        atm.data[key] = newRec;
        return atm.data[key];
    },
    delete : (key) => {
        delete atm.data[key]
        return true
    }
}

module.exports = atm;