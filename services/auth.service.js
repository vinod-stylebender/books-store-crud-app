const db = require('../db-config/db.config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/helper')

const register = async (username, password) => {
    try {
        const usernames = 'SELECT username from USER';
        const rows = db.queryBuilder(usernames);
        const data = await helper.emptyOrRows(rows)
        const userExist = data.find(user=> user.username === username);
        if (userExist) {
            throw new Error('Username already exist!')
        } else {
            const encryptedPass = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO USER (username, password) VALUES (?, ?)';
            const rows = db.queryBuilder(query, [username, encryptedPass]);
            const data = await helper.emptyOrRows(rows)
            return data
        }
    } catch (e) {
        throw e
    }
}

const login = async (username, password) => {
    try {
        const query = 'select username, password from user where username = (?)';
        const rows = db.queryBuilder(query, [username])
        const data = await helper.emptyOrRows(rows);
        if (data[0].username && (await bcrypt.compare(password, data[0].password))) {
            const token = jwt.sign(
                { user_id: username, password },
                process.env.JSON_TOKEN,
                {
                    expiresIn: '2h'
                })
                return token
        } else {
            throw new Error('Please enter a valid Username and Password!')
        }
    } catch (e) {
        throw e;
    }
}

module.exports = {
    register, login
}