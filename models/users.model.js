const db = require('../data/adapters/users.adapter');
const cHelper = require('../helpers/common.helper');

class Users {

    async loginUser(queryOBJ = {}) {
        let user = await db.get(queryOBJ.username)
        if(user.password !== queryOBJ.password){
            user = undefined
        }
        return user;
    }

    async createUser(data) {
        let user =  await db.add(data)
        return user;
    }

    async getAllUsers() {
        let users =  await db.getAll()
        return users
    }

    async getUser(username) {
        let user =  await db.get(username);
        return user
    }

    async updateUser(username, data) {
        let user =  await db.update(username, data);
        return user
    }

    async deleteUser(username) {
        let user =  await db.delete(username);
        return user
    }

}

module.exports = new Users();