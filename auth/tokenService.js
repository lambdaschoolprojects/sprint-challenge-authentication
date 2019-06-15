const jwt = require('jsonwebtoken'); // installed this library

const secret = process.env.JWT_SECRET;

module.exports = {
    generateToken,
};

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secret, options);
}