const jwt = require('jsonwebtoken');
const config = process.env

const authTokenValidation = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token){
        return res.status(403).send("A token is required for authentication")
    } else {
        try {
            const decode = jwt.verify(token, config.JSON_TOKEN)
            req.user = decode
        } catch(e){
            return res.status(401).send({message: "Invalid token"})
        }

        return next();
    }
}

module.exports = authTokenValidation;