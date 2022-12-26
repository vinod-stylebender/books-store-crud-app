const AuthService = require('../services/auth.service');
const { userSchema } = require('../validations/validation')

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const validate = userSchema.validate(req.body);
        if (validate?.error) {
            throw new Error(validate.error);
        }

        await AuthService.register(username, password);
        return res.status(200).send({ message: 'User registered successfully!'})
    } catch (e) {
        return res.status(400).send({ message: e.message})
    }
}
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const validate = userSchema.validate(req.body);
        if (validate?.error) {
            throw new Error(validate.error);
        }
        
        const data = await AuthService.login(username, password);
        return res.status(200).send(data)
    } catch (e) {
        return res.status(400).send({ message: e.message})
    }
}

module.exports = {
    register, login
}