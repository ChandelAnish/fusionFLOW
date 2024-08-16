const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const setUser = (username,email, password) => {
    const payload = {
        username,
        email,
        password
    }
    return jwt.sign(payload, secret)
}

const getUser = (token) => {
    if (!token) {
        return null;
    }
    return jwt.verify(token, secret);
}

module.exports = { setUser, getUser } 