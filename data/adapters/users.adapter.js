const user = {
    data : {},

    get : (key) => {
        return (user.data[key] == undefined)? undefined : user.data[key]
    },
    getAll: () =>{
        return Object.values(user.data);
    },

    add : (newRec) => {
        let status = false
        if(user.data[newRec.username] === undefined){
            user.data[newRec.username] = newRec;
            status = true;
        }
        return (status)? user.data[newRec.username] : undefined; 
    },
    update : (key, newRec) => {
        user.data[key] = newRec
        return user.data[key];
    },
    delete : (key) => {
        delete user.data[key]
        return true
    },
}

module.exports = user